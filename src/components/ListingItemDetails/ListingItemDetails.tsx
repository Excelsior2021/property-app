import { Component } from "solid-js"
import { listingDataType } from "../../types/general"
import "./ListingItemDetails.scss"

interface ListingItemDetailsProps {
  listing: listingDataType
}

const ListingItemDetails: Component<ListingItemDetailsProps> = props => {
  return (
    <div class="listing-item-details">
      <p class="listing-item-details__location">{props.listing.location}</p>
      <p class="listing-item-details__price">Gh₵{props.listing.price} p/m</p>
    </div>
  )
}

export default ListingItemDetails
