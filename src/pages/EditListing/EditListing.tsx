import { Component } from "solid-js"
import { useLocation } from "@solidjs/router"
import ListingForm from "../../components/ListingForm/ListingForm"
import "./EditListing.scss"

const EditListing: Component = () => {
  const location = useLocation()

  return (
    <div class="edit-listing">
      <ListingForm
        listingDetails={location.state!.listing.property.propertyDetails}
      />
    </div>
  )
}

export default EditListing
