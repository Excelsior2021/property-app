import { Component } from "solid-js"
import { useNavigate } from "@solidjs/router"
import ImageContainer from "../ImageContainer/ImageContainer"
import ListingItemDetails from "../ListingItemDetails/ListingItemDetails"
import { accessToken, loggedIn, setCurrentListing } from "../../store/store"
import { listingType } from "../../types/general"
import { saveListing, unsaveListing } from "../../api/api-endpoints"
import { fetchSavedListingsIds } from "../../api/api"
import routes from "../../utils/client-routes"
import "./ListingItem.scss"

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
      navigate(routes.login)
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

  const handleNavigate = (event: Event, requestPage: string) => {
    event.stopPropagation()

    switch (requestPage) {
      case "details":
        navigate(`${routes.listing}/${props.listing.property.id}`)
        break
      case "edit":
        setCurrentListing(props.listing)
        navigate(`${routes.editListing}/${props.listing.property.id}`, {
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
      <ImageContainer
        images={props.listing.images}
        handleNavigate={handleNavigate}
        edit={props.edit}
      />

      <img
        class="listing-item__icon listing-item__icon--save"
        src={props.saved ? "/icons/saved-active.svg" : "/icons/saved.svg"}
        alt="save listing"
        onclick={event => handleClickOnSave(event, props.listing)}
      />

      <div class="listing-item__details">
        <ListingItemDetails
          listingDetails={props.listing.property.propertyDetails}
        />
      </div>
    </li>
  )
}

export default ListingItem
