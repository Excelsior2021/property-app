import { Component, Show } from "solid-js"
import { listingDataType } from "../../types/general"
import ListingItemDetails from "../ListingItemDetails/ListingItemDetails"
import { loggedIn, setModal, setModalOverlayData } from "../../store/store"
import "./ListingDetails.scss"

interface listingDetailsProps {
  listing: listingDataType
}

const ListingDetailsContactButton = (
  <button
    class="listing-details__button listing-details__button--contact"
    onclick={() => {
      setModal(true)
      setModalOverlayData({
        message: "Please log in to see contact details",
        buttonText: "log in",
      })
    }}>
    show contact details
  </button>
)

const ListingDetails: Component<listingDetailsProps> = props => {
  return (
    <div class="listing-details">
      <ListingItemDetails listing={props.listing} />
      <p class="listing-details__description">{props.listing.description}</p>
      <Show when={loggedIn()} fallback={ListingDetailsContactButton}>
        <p class="listing-details__contact">
          contact number: {props.listing.phone}
        </p>
        <p class="listing-details__email">email: {props.listing.email}</p>
      </Show>
    </div>
  )
}

export default ListingDetails
