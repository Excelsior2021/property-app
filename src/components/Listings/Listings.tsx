import { Component, createEffect, createSignal, For } from "solid-js"
import ListingItem from "../ListingItem/ListingItem"
import { getListings } from "../../api/api-endpoints"
import "./Listings.scss"

const Listings: Component = () => {
  const [listings, setListings] = createSignal(null)

  createEffect(async () => {
    const res = await fetch(getListings)
    setListings(await res.json())
  }, [])

  const handle = () => {}

  return (
    <ul class="listings">
      <For each={listings()}>
        {listing => <ListingItem listing={listing} />}
      </For>
    </ul>
  )
}

export default Listings
