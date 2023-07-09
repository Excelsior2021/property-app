import { Component, Show } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { listingDataType } from "../../types/general"
import ListingItemDetails from "../ListingItemDetails/ListingItemDetails"
import { loggedIn, setModal, setModalOverlayData } from "../../store/store"
import routes from "../../utils/client-routes"
import "./ListingDetails.scss"

interface listingDetailsProps {
  listing: listingDataType
}

const ListingDetailsContactButton = () => {
  const navigate = useNavigate()
  return (
    <button
      class="listing-details__button listing-details__button--contact"
      onclick={() => {
        setModal(true)
        setModalOverlayData({
          message: "Please log in to see contact details",
          buttonText: "log in",
          buttonHandler: () => navigate(routes.login),
        })
      }}>
      show contact details
    </button>
  )
}

const ListingDetails: Component<listingDetailsProps> = props => {
  return (
    <div class="listing-details">
      <p class="listing-details__location">{props.listing.location}</p>
      <p class="listing-details__price">Gh₵{props.listing.price} p/m</p>
      <p class="listing-details__price"></p>
      <p class="listing-details__description">{props.listing.description}</p>
      <Show when={loggedIn()} fallback={ListingDetailsContactButton}>
        <p class="listing-details__contact">
          Contact Number: {props.listing.phone}
        </p>
        <p class="listing-details__email">Email: {props.listing.email}</p>
      </Show>
    </div>
  )
}

export default ListingDetails
