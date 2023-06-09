import { Component, createSignal, For } from "solid-js"
import { accessToken } from "../../store/store"
import ListingItem from "../../components/ListingItem/ListingItem"
import { listing } from "../../api/api-endpoints"
import "./MyListings.scss"

const MyListings: Component = () => {
  const [listings, setListings] = createSignal(null)

  const fetchListings = async () => {
    const res = await fetch(listing, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    })

    const data = await res.json()
    console.log(data)
    setListings(data)
  }

  fetchListings()

  return (
    <div>
      <For each={listings()}>
        {listing => <ListingItem listing={listing} />}
      </For>
    </div>
  )
}

export default MyListings
