import { Component } from "solid-js"
import ListingForm, {
  listingFormData,
} from "../../components/ListingForm/ListingForm"
import "./NewListing.scss"

const NewListing: Component = () => {
  return (
    <div class="new-listing">
      <ListingForm listingDetails={listingFormData()} page="new" />
    </div>
  )
}

export default NewListing
