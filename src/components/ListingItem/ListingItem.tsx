import { Component } from "solid-js"
import { useNavigate } from "@solidjs/router"
import ImageContainer from "../ImageContainer/ImageContainer"
import ListingItemDetails from "../ListingItemDetails/ListingItemDetails"
import { loggedIn, setCurrentListing } from "../../store/store"
import { listingType } from "../../types/general"
import { handleSave } from "../../api/api"
import routes from "../../utils/client-routes"
import "./ListingItem.scss"

interface ListingItemProps {
  listing: listingType
  saved: boolean
  edit: boolean
}

const ListingItem: Component<ListingItemProps> = props => {
  const navigate = useNavigate()

  const handleClickOnSave = (event: Event, listing: listingType) => {
    event.stopPropagation()

    if (loggedIn()) {
      if (props.saved) {
        handleSave(listing, false)
      } else {
        handleSave(listing, true)
      }
    } else {
      navigate(routes.login)
    }
  }

  const handleNavigate = (event: Event, requestPage: string) => {
    event.stopPropagation()

    switch (requestPage) {
      case "details":
        navigate(`${routes.listing}/${props.listing.listing.id}`)
        break
      case "edit":
        setCurrentListing(props.listing)
        navigate(`${routes.editListing}/${props.listing.listing.id}`, {
          state: { listing: props.listing },
        })
        break
      default:
        break
    }
  }

  return (
    <li class="listing-item" onclick={null}>
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
        <ListingItemDetails listing={props.listing.listing} />
      </div>
    </li>
  )
}

export default ListingItem
