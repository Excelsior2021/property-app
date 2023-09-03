import { Component } from "solid-js"
import ListingForm, {
  listingFormData,
} from "../../components/ListingForm/ListingForm"
import "./NewListing.scss"

const NewListing: Component = () => (
  <div class="new-listing">
    <ListingForm listing={listingFormData()} page="new" heading="new listing" />
  </div>
)

export default NewListing
