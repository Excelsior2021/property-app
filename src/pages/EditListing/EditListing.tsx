import { Component } from "solid-js"
import { useLocation } from "@solidjs/router"
import ListingForm from "../../components/ListingForm/ListingForm"
import "./EditListing.scss"
import { currentListing } from "../../store/store"

const EditListing: Component = () => {
  const location = useLocation()

  return (
    <div class="edit-listing">
      <ListingForm
        listingDetails={currentListing().property.propertyDetails}
        listingId={currentListing().property.id}
        page="edit"
      />
    </div>
  )
}

export default EditListing
