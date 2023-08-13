import { Component, For } from "solid-js"
import ListingItem from "../ListingItem/ListingItem"
import { listingType } from "../../types/general"
import { savedListingsIds } from "../../store/store"
import "./Listings.scss"

interface listingsProps {
  listings: listingType[]
  page: string
  heading?: string
  edit?: boolean
  delete?: boolean
  search?: boolean
  refetch?: () => any
}

const Listings: Component<listingsProps> = props => {
  return (
    <div class="listings">
      <h2
        class={
          props.search
            ? "listings__heading listings__heading--search"
            : "listings__heading"
        }>
        {props.heading}
      </h2>
      <ul class="listings__list">
        <For each={props.listings}>
          {listing => {
            return (
              <ListingItem
                listing={listing}
                page={props.page}
                saved={savedListingsIds().includes(
                  props.search ? listing.id : listing.listing.id
                )}
                edit={props.edit ? true : false}
                delete={props.delete ? true : false}
                search={props.search ? true : false}
                refetch={props.refetch}
              />
            )
          }}
        </For>
      </ul>
    </div>
  )
}

export default Listings
