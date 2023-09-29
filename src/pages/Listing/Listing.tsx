import { Component, Show, createResource } from "solid-js"
import { useParams } from "@solidjs/router"
import ImageContainer from "../../components/ImageContainer/ImageContainer"
import ListingDetails from "../../components/ListingDetails/ListingDetails"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { fetchListingDetails } from "../../api/api"
import ListingImages from "../../components/ListingImages/ListingImages"
import { previousPage, savedListingsIds } from "../../store/store"
import ReturnButton from "../../components/ReturnButton/ReturnButton"
import "./Listing.scss"

const Listing: Component = () => {
  const params = useParams()
  const [listing] = createResource(async () => {
    const listing = await fetchListingDetails(params.id)
    console.log(listing)
    return listing
  })

  return (
    <div class="listing">
      {previousPage() && <ReturnButton />}
      <Show when={!listing.loading} fallback={<LoadingSpinner />}>
        <p class="listing__title">{listing().listing.title}</p>
        <ImageContainer images={listing().images} page="listing" />
        <ListingImages images={listing().images} />
        <ListingDetails
          listing={listing().listing}
          saved={savedListingsIds().includes(listing().listing.id)}
        />
      </Show>
    </div>
  )
}

export default Listing
