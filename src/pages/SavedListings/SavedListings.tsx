import { Component, Show, createResource } from "solid-js"
import { accessToken, loggedIn } from "../../store/store"
import { getSavedListings } from "../../api/api-endpoints"
import Listings from "../../components/Listings/Listings"
import "./SavedListings.scss"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

const SavedListings: Component = () => {
  const fetchListings = async () => {
    if (loggedIn()) {
      const res = await fetch(getSavedListings, {
        headers: {
          Authorization: `Bearer ${accessToken()}`,
        },
      })
      return await res.json()
    }
  }

  const [savedListings] = createResource(fetchListings)

  const loginFallback = (
    <p class="saved-listings__fallback-text">
      Please login to see your saved listings
    </p>
  )

  const noDataFallback = (
    <p class="saved-listings__fallback-text">
      You have not saved any listings. Go and discover some :)
    </p>
  )

  return (
    <div class="saved-listings">
      <Show when={loggedIn()} fallback={loginFallback}>
        <Show when={!savedListings.loading} fallback={<LoadingSpinner />}>
          <Show when={savedListings().length > 0} fallback={noDataFallback}>
            <Listings listings={savedListings()} />
          </Show>
        </Show>
      </Show>
    </div>
  )
}

export default SavedListings
