import { Component } from "solid-js"
import ListingForm from "../../components/ListingForm/ListingForm"
import "./NewListing.scss"

const NewListing: Component = () => {
  return (
    <div class="new-listing">
      <ListingForm />
    </div>
  )
}

export default NewListing
