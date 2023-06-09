import { Component, createSignal, createEffect, For } from "solid-js"
import ListingItem from "../../components/ListingItem/ListingItem"
import { accessToken, loggedIn } from "../../store/store"

const SavedListings: Component = () => {
  const [savedListings, setSavedListings] = createSignal([])

  if (loggedIn()) {
    createEffect(async () => {
      const res = await fetch("http://localhost:8080/likes", {
        headers: {
          Authorization: `Bearer ${accessToken()}`,
        },
      })
      const data = await res.json()
      console.log(data)
      setSavedListings(data)
    })

    return (
      <div class="saved-listings">
        <h1 class="page__heading">Saved Properties</h1>
        <ul class="saved-listings__list">
          <For each={savedListings()}>
            {listing => <ListingItem listing={listing} saved={true} />}
          </For>
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
