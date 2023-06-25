import { Component, Show, createEffect, createResource } from "solid-js"
import { useParams } from "@solidjs/router"
import ImageContainer from "../../components/ImageContainer/ImageContainer"
import ListingDetails from "../../components/ListingDetails/ListingDetails"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { fetchListingDetails } from "../../api/api"
import "./Listing.scss"

const Listing: Component = () => {
  const params = useParams()
  const [listing] = createResource(() => fetchListingDetails(params.id))

  createEffect(() => console.log(listing()))

  return (
    <div class="listing">
      <Show when={!listing.loading} fallback={<LoadingSpinner />}>
        <p class="listing__title">{listing().property.propertyDetails.title}</p>
        <ImageContainer images={listing().images} />
        <ListingDetails listingProperty={listing().property} />
      </Show>
    </div>
  )
}

export default Listing
