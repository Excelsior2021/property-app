import { Component, createSignal, createEffect, Show } from "solid-js"
import Listings from "../../components/Listings/Listings"
import { getListings } from "../../api/api-endpoints"
import "./Discover.scss"

const Discover: Component = () => {
  const [listings, setListings] = createSignal([])

  createEffect(async () => {
    const res = await fetch(getListings)
    setListings(await res.json())
  })

  const fallback = <p class="discover__no-data">There aren't any listings :(</p>

  return (
    <div class="discover">
      <Show when={listings().length > 0} fallback={fallback}></Show>
      <Listings listings={listings()} />
    </div>
  )
}

export default Discover
