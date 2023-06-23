import { Component } from "solid-js"
import { listingDetailsType } from "../../types/general"
import ListingItemDetails from "../ListingItemDetails/ListingItemDetails"
import "./ListingDetails.scss"

interface listingDetailsProps {
  listingDetails: listingDetailsType
}

const ListingDetails: Component<listingDetailsProps> = props => (
  <div class="listing-details">
    <ListingItemDetails listingDetails={props.listingDetails} />
    <p class="listing-details__description">
      {props.listingDetails.description}
    </p>
    <p class="listing-details__contact">
      contact number: {props.listingDetails.phone}
    </p>
  </div>
)

export default ListingDetails
