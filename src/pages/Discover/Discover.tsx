import { Component, createSignal, createEffect } from "solid-js"
import Listings from "../../components/Listings/Listings"
import { getListings } from "../../api/api-endpoints"

const Discover: Component = () => {
  const [listings, setListings] = createSignal([])

  createEffect(async () => {
    const res = await fetch(getListings)
    setListings(await res.json())
  })

  return (
    <div class="discover">
      <Listings listings={listings()} />
    </div>
  )
}

export default Discover
