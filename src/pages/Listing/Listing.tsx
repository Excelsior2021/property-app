import { Component, Show, createResource } from "solid-js"
import { useParams } from "@solidjs/router"
import dummyListings from "../../data/listings.json"
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

  if (params.id.includes("dummy")) {
    const listing = dummyListings.find(
      listing => listing.listing.id === params.id
    )
    return (
      <div class="listing">
        {previousPage() && <ReturnButton />}
        <p class="listing__title">{listing.listing.title}</p>
        <ImageContainer images={listing.images} page="listing" />
        <ListingImages images={listing.images} />
        <ListingDetails
          listing={listing.listing}
          saved={savedListingsIds().includes(listing.listing.id)}
        />
      </div>
    )
  } else {
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
}

export default Listing
