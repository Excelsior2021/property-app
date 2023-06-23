import { Component, Show } from "solid-js"
import { listingDetailsType } from "../../types/general"
import ListingItemDetails from "../ListingItemDetails/ListingItemDetails"
import { loggedIn, setModal, setModalOverlayData } from "../../store/store"
import "./ListingDetails.scss"

interface listingDetailsProps {
  listingDetails: listingDetailsType
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

const ListingDetails: Component<listingDetailsProps> = props => (
  <div class="listing-details">
    <ListingItemDetails listingDetails={props.listingDetails} />
    <p class="listing-details__description">
      {props.listingDetails.description}
    </p>
    <Show when={loggedIn()} fallback={ListingDetailsContactButton}>
      <p class="listing-details__contact">
        contact number: {props.listingDetails.phone}
      </p>
    </Show>
  </div>
)

export default ListingDetails
