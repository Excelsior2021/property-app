import { Component, createEffect, createSignal, Show } from "solid-js"
import { accessToken } from "../../store/store"
import Listings from "../../components/Listings/Listings"
import { listing } from "../../api/api-endpoints"
import "./MyListings.scss"

const MyListings: Component = () => {
  const [listings, setListings] = createSignal([])

  createEffect(async () => {
    const res = await fetch(listing, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    })

    const data = await res.json()
    setListings(data)
  })

  const fallback = (
    <p class="my-listings__fallback-text">
      You do not have any listings. Would you like to create one?
    </p>
  )

  return (
    <div class="my-listings">
      <Show when={listings().length > 0} fallback={fallback}>
        <Listings listings={listings()} edit={true} />
      </Show>
    </div>
  )
}

export default MyListings
