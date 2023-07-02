import { Component, For } from "solid-js"
import ListingItem from "../ListingItem/ListingItem"
import { listingType } from "../../types/general"
import { savedListingsIds } from "../../store/store"
import "./Listings.scss"

interface listingsProps {
  listings: listingType[]
  edit?: boolean
  delete?: boolean
  search?: boolean
  refetch?: () => any
}

const Listings: Component<listingsProps> = props => {
  return (
    <ul class="listings">
      <For each={props.listings}>
        {listing => {
          return (
            <ListingItem
              listing={listing}
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
  )
}

export default Listings
