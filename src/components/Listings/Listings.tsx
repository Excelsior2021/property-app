import { Component, createEffect, createSignal, For } from "solid-js"
import ListingItem from "../ListingItem/ListingItem"
import "./Listings.scss"

const Listings: Component = () => {
  const [listings, setListings] = createSignal(null)

  createEffect(async () => {
    const res = await fetch("http://localhost:8080/api/homes/v1/listing")
    setListings(await res.json())
  }, [])

  return (
    <ul class="listings">
      <For each={listings()}>
        {listing => <ListingItem listing={listing} />}
      </For>
    </ul>
  )
}

export default Listings
