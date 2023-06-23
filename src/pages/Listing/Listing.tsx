import { Component, Show, createResource } from "solid-js"
import { useParams } from "@solidjs/router"
import ImageContainer from "../../components/ImageContainer/ImageContainer"
import ListingDetails from "../../components/ListingDetails/ListingDetails"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { fetchListingDetails } from "../../api/api"
import "./Listing.scss"

const Listing: Component = () => {
  const params = useParams()
  const [listing] = createResource(() => fetchListingDetails(params.id))

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
