import { Component, createSignal, For } from "solid-js"
import { accessToken } from "../../store/store"
import ListingItem from "../../components/ListingItem/ListingItem"
import "./MyListings.scss"

const MyListings: Component = () => {
  const [listings, setListings] = createSignal(null)

  const fetchListings = async () => {
    const res = await fetch("http://localhost:8080/property", {
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
      <h1 class="my-listings__title">my listings</h1>
      <For each={listings()}>
        {listing => <ListingItem listing={listing} />}
      </For>
    </div>
  )
}

export default MyListings
