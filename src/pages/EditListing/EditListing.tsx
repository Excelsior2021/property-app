import { Component, createEffect, createSignal } from "solid-js"
import { useParams } from "@solidjs/router"
import ListingForm from "../../components/ListingForm/ListingForm"
import { accessToken } from "../../store/store"
import { getListingDetails } from "../../api/api-endpoints"
import "./EditListing.scss"

const EditListing: Component = () => {
  const [listing, setListing] = createSignal(null)
  const params = useParams()

  createEffect(async () => {
    const res = await fetch(getListingDetails(params.id), {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    })

    const data = await res.json()
    setListing(data)
  })

  return (
    <div class="edit-listing">
      {listing() && (
        <ListingForm
          listingDetails={listing().property.propertyDetails}
          listingId={listing().property.id}
          page="edit"
        />
      )}
    </div>
  )
}

export default EditListing
