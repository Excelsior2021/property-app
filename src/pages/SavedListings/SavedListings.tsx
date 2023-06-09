import { Component, createSignal, createEffect, For } from "solid-js"
import { accessToken, loggedIn } from "../../store/store"
import { getSavedListings } from "../../api/api-endpoints"
import Listings from "../../components/Listings/Listings"

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

    return (
      <div class="saved-listings">
        <h1 class="page__heading">Saved Properties</h1>
        <ul class="saved-listings__list">
          <Listings listings={savedListings()} />
        </ul>
      </div>
    )
  } else {
    return (
      <>
        <p class="saved-listings__text">
          Please login to see your saved listings.
        </p>
      </>
    )
  }
}

export default SavedListings
