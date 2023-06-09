import { Component, For } from "solid-js"
import ListingItem from "../ListingItem/ListingItem"
import { listingType } from "../../types/general"
import { savedListingsIds } from "../../store/store"
import "./Listings.scss"

interface listingsProps {
  listings: listingType[]
}

const Listings: Component<listingsProps> = props => {
  return (
    <ul class="listings">
      <For each={props.listings}>
        {listing => {
          return (
            <ListingItem
              listing={listing}
              saved={savedListingsIds().includes(listing.property.id)}
            />
          )
        }}
      </For>
    </ul>
  )
}

export default Listings
