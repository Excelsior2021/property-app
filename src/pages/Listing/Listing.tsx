import { Component, Show, createResource } from "solid-js"
import { useParams } from "@solidjs/router"
import ImageContainer from "../../components/ImageContainer/ImageContainer"
import ListingDetails from "../../components/ListingDetails/ListingDetails"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { accessToken } from "../../store/store"
import { getListingDetails } from "../../api/api-endpoints"
import "./Listing.scss"

const Listing: Component = () => {
  const params = useParams()

  const fetchListing = async () => {
    const res = await fetch(getListingDetails(params.id), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken()}`,
      },
    })

    return await res.json()
  }

  const [listing] = createResource(fetchListing)

  return (
    <div class="listing">
      <Show when={!listing.loading} fallback={<LoadingSpinner />}>
        <p class="listing__title">{listing().property.propertyDetails.title}</p>
        <ImageContainer images={listing().images} />
        <ListingDetails listingDetails={listing().property.propertyDetails} />
      </Show>
    </div>
  )
}

export default Listing
