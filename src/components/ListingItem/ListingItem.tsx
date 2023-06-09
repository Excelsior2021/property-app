import { Component, createSignal, createEffect } from "solid-js"
import { useNavigate } from "@solidjs/router"
import ImageContainer from "../ImageContainer/ImageContainer"
import PropertyDetails from "../PropertyDetails/PropertyDetails"
import { accessToken, loggedIn } from "../../store/store"
import { listingType } from "../../types/general"
import "./ListingItem.scss"
import { saveListing, unsaveListing } from "../../api/api-endpoints"

interface ListingItemProps {
  listing: listingType
  saved: boolean
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
  }

  const handleNavigate = () => {
    navigate(`/listing/${props.listing.property.id}`)
  }

  return (
    <li class="listing-item" onclick={handleNavigate}>
      <ImageContainer images={props.listing.images} />

      <img
        class="listing-item__icon"
        src={props.saved ? "./icons/saved-active.svg" : "./icons/saved.svg"}
        alt="save property"
        onclick={event => handleClickOnSave(event, props.listing)}
      />

      <div class="listing-item__details">
        <PropertyDetails
          propertyDetails={props.listing.property.propertyDetails}
        />
      </div>
    </li>
  )
}

export default ListingItem
