import { Component, createSignal, createEffect } from "solid-js"
import { useNavigate } from "@solidjs/router"
import ImageContainer from "../ImageContainer/ImageContainer"
import PropertyDetails from "../PropertyDetails/PropertyDetails"
import { accessToken, loggedIn } from "../../store/store"
import { listingType } from "../../types/general"
import "./ListingItem.scss"
import { saveListing, unsaveListing } from "../../api/api-endpoints"
import { fetchSavedListingsIds } from "../../api/api"

interface ListingItemProps {
  listing: listingType
  saved: boolean
  edit: boolean
}

const ListingItem: Component<ListingItemProps> = props => {
  const navigate = useNavigate()

  const handleClickOnSave = (event, listing) => {
    event.stopPropagation()

    if (loggedIn()) {
      if (props.saved) {
        handleUnsave(listing)
      } else {
        handleSave(listing)
      }
    } else {
      navigate("./login")
    }
  }

  const handleUnsave = async listing => {
    const {
      property: { email, id },
    } = listing

    const res = await fetch(unsaveListing, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken()}`,
      },
      body: JSON.stringify({
        userId: email,
        propertyId: id,
      }),
    })
    fetchSavedListingsIds()
  }

  const handleSave = async listing => {
    const date = new Date().toISOString()
    const {
      property: { email, id },
    } = listing

    const res = await fetch(saveListing, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken()}`,
      },
      body: JSON.stringify({
        userId: email,
        propertyId: id,
        createdAt: date,
      }),
    })
    fetchSavedListingsIds()
  }

  const handleNavigate = (event: Event, page: string) => {
    event.stopPropagation()

    switch (page) {
      case "details":
        navigate(`/listing/${props.listing.property.id}`)
        break
      case "edit":
        navigate(`/edit-listing/${props.listing.property.id}`, {
          state: { listing: props.listing },
        })
        break
      default:
        null
    }
  }

  return (
    <li
      class="listing-item"
      onclick={event => handleNavigate(event, "details")}>
      <ImageContainer images={props.listing.images} />

      <img
        class="listing-item__icon listing-item__icon--save"
        src={props.saved ? "./icons/saved-active.svg" : "./icons/saved.svg"}
        alt="save listing"
        onclick={event => handleClickOnSave(event, props.listing)}
      />

      {props.edit && (
        <div
          class="listing-item__edit-container"
          onclick={event => handleNavigate(event, "edit")}>
          <img
            src="./icons/edit.svg"
            alt="edit listing"
            class="listing-item__icon listing-item__icon--edit"
          />
        </div>
      )}

      <div class="listing-item__details">
        <PropertyDetails
          propertyDetails={props.listing.property.propertyDetails}
        />
      </div>
    </li>
  )
}

export default ListingItem
