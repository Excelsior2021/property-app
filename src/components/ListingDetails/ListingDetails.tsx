import { Component, Show } from "solid-js"
import { useNavigate } from "@solidjs/router"
import ContactCard from "../ContactCard/ContactCard"
import { listingDataType } from "../../types/general"
import { loggedIn } from "../../store/store"
import { handleSave } from "../../api/api"
import routes from "../../utils/client-routes"
import "./ListingDetails.scss"

interface listingDetailsProps {
  listing: listingDataType
  saved: boolean
}

const ListingDetails: Component<listingDetailsProps> = props => {
  const navigate = useNavigate()

  const handleClickOnSave = (listing: listingDataType) => {
    if (loggedIn()) {
      if (props.saved) handleSave(listing, false)
      else handleSave(listing, true)
    } else navigate(routes.login)
  }

  return (
    <div class="listing-details">
      <div class="listing-details__container listing-details__container--top">
        <div>
          <p class="listing-details__location">{props.listing.location}</p>
          <p class="listing-details__price">Gh₵{props.listing.price} p/m</p>
        </div>
        <div
          class="listing-details__container listing-details__container--save"
          onclick={() => handleClickOnSave(props.listing)}>
          <img
            src={props.saved ? "/icons/saved-active.svg" : "/icons/saved.svg"}
            alt="save listing"
            class="listing-details__icon"
          />
          <p class="listing-details__icon-text">
            {props.saved ? "unsave" : "save"}
          </p>
        </div>
      </div>
      <div class="listing-details__container listing-details__container--bottom">
        <p class="listing-details__description">{props.listing.description}</p>
        <ContactCard phone={props.listing.phone} email={props.listing.email} />
      </div>
    </div>
  )
}

export default ListingDetails
