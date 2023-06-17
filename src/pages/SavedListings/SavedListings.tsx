import { Component, createSignal, createEffect, Show } from "solid-js"
import { accessToken, loggedIn } from "../../store/store"
import { getSavedListings } from "../../api/api-endpoints"
import Listings from "../../components/Listings/Listings"
import "./SavedListings.scss"

const SavedListings: Component = () => {
  const [savedListings, setSavedListings] = createSignal([])

  if (loggedIn()) {
    createEffect(async () => {
      const res = await fetch(getSavedListings, {
        headers: {
          Authorization: `Bearer ${accessToken()}`,
        },
      })
      const data = await res.json()
      setSavedListings(data)
    })
  }

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
        <Show when={savedListings().length > 0} fallback={noDataFallback}>
          <ul class="saved-listings__list">
            <Listings listings={savedListings()} />
          </ul>
        </Show>
      </Show>
    </div>
  )
}

export default SavedListings
