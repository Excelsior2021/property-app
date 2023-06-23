import { Component, createEffect, createSignal } from "solid-js"
import { useParams } from "@solidjs/router"
import ListingForm from "../../components/ListingForm/ListingForm"
import { getListingDetails } from "../../api/api-endpoints"
import "./EditListing.scss"
import { handleServerError } from "../../utils/utils"

const EditListing: Component = () => {
  const [listing, setListing] = createSignal(null)
  const params = useParams()

  createEffect(async () => {
    let res
    try {
      const res = await fetch(getListingDetails(params.id))
      if (res.status === 200) {
        const data = await res.json()
        setListing(data)
      } else throw new Error()
    } catch (error) {
      handleServerError(res)
    }
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
