import { Component } from "solid-js"
import ListingForm from "../../components/ListingForm/ListingForm"
import "./NewListing.scss"

export const initialListingFormData = {
  title: "",
  description: "",
  price: NaN,
  location: "",
  phone: "",
}

const NewListing: Component = () => {
  return (
    <div class="new-listing">
      <ListingForm listingDetails={initialListingFormData} />
    </div>
  )
}

export default NewListing
