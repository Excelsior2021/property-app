import { Component } from "solid-js"
import { listingDetailsType } from "../../types/general"
import "./ListingDetails.scss"

interface listingDetailsProps {
  listingDetails: listingDetailsType
}

const ListingDetails: Component<listingDetailsProps> = props => (
  <div class="listing-details">
    <p class="listing-details__location">{props.listingDetails.location}</p>
    <p class="listing-details__price">Gh₵{props.listingDetails.price} p/m</p>
    <p class="listing-details__description">
      {props.listingDetails.description}
    </p>
    <p class="listing-details__contact">
      contact number: {props.listingDetails.phone}
    </p>
  </div>
)

export default ListingDetails
