import { Component } from "solid-js"
import { listingDetailsType } from "../../types/general"
import "./ListingItemDetails.scss"

interface ListingItemDetailsProps {
  listingDetails: listingDetailsType
}

const ListingItemDetails: Component<ListingItemDetailsProps> = props => (
  <div class="listing-item-details">
    <p class="listing-item-details__location">
      {props.listingDetails.location}
    </p>
    <p class="listing-item-details__price">
      Gh₵{props.listingDetails.price} p/m
    </p>
  </div>
)

export default ListingItemDetails
