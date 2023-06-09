import { Component, createSignal, For } from "solid-js"
import { accessToken } from "../../store/store"
import ListingItem from "../../components/ListingItem/ListingItem"
import { listing } from "../../api/api-endpoints"
import "./MyListings.scss"
import Listings from "../../components/Listings/Listings"

const MyListings: Component = () => {
  const [listings, setListings] = createSignal([])

  const fetchListings = async () => {
    const res = await fetch(listing, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    })

    const data = await res.json()
    setListings(data)
  }

  fetchListings()

  return (
    <ul class="my-listings">
      <Listings listings={listings()} />
    </ul>
  )
}

export default MyListings
