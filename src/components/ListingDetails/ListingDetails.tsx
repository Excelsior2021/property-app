import { Component, Show } from "solid-js"
import { propertyType } from "../../types/general"
import ListingItemDetails from "../ListingItemDetails/ListingItemDetails"
import { loggedIn, setModal, setModalOverlayData } from "../../store/store"
import "./ListingDetails.scss"

interface listingDetailsProps {
  listingProperty: propertyType
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
    <ListingItemDetails
      listingDetails={props.listingProperty.propertyDetails}
    />
    <p class="listing-details__description">
      {props.listingProperty.propertyDetails.description}
    </p>
    <Show when={loggedIn()} fallback={ListingDetailsContactButton}>
      <p class="listing-details__contact">
        contact number: {props.listingProperty.propertyDetails.phone}
      </p>
      <p class="listing-details__email">email: {props.listingProperty.email}</p>
    </Show>
  </div>
)

export default ListingDetails
