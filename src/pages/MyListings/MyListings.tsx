import { Component, createResource, Show } from "solid-js"
import { accessToken } from "../../store/store"
import Listings from "../../components/Listings/Listings"
import { listing } from "../../api/api-endpoints"
import "./MyListings.scss"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

const MyListings: Component = () => {
  const fetchListings = async () => {
    const res = await fetch(listing, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    })
    return await res.json()
  }
  const [listings] = createResource(fetchListings)

  const fallback = (
    <p class="my-listings__fallback-text">
      You do not have any listings. Would you like to create one?
    </p>
  )

  return (
    <div class="my-listings">
      <Show when={!listings.loading} fallback={<LoadingSpinner />}>
        <Show when={listings().length > 0} fallback={fallback}>
          <Listings listings={listings()} edit={true} />
        </Show>
      </Show>
    </div>
  )
}

export default MyListings
