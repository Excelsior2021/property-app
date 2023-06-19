import { Component, Show, createResource } from "solid-js"
import Listings from "../../components/Listings/Listings"
import { getListings } from "../../api/api-endpoints"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import "./Discover.scss"

const Discover: Component = () => {
  const fetchListings = async () => {
    const res = await fetch(getListings)
    return await res.json()
  }

  const [listings] = createResource(fetchListings)

  const fallback = <p class="discover__no-data">There aren't any listings :(</p>

  return (
    <div class="discover">
      <Show when={!listings.loading} fallback={<LoadingSpinner />}>
        <Show when={listings().length > 0} fallback={fallback}>
          <Listings listings={listings()} />
        </Show>
      </Show>
    </div>
  )
}

export default Discover
