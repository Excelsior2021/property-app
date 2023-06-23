import { Component, createResource, Show } from "solid-js"
import Listings from "../../components/Listings/Listings"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { accessToken } from "../../store/store"
import { listing } from "../../api/api-endpoints"
import { handleServerError } from "../../utils/utils"
import "./MyListings.scss"

const MyListings: Component = () => {
  const fetchListings = async () => {
    let res
    try {
      res = await fetch(listing, {
        headers: {
          Authorization: `Bearer ${accessToken()}`,
        },
      })
      if (res.status === 200) return await res.json()
      else throw new Error()
    } catch (error) {
      handleServerError(res)
    }
  }
  const [listings] = createResource(fetchListings)

  const fallback = (
    <p class="my-listings__fallback-text">
      You do not have any listings. Would you like to create one?
    </p>
  )

  return (
    <div class="my-listings">
      <Show when={!listings.loading} fallback={<LoadingSpinner />}>
        <Show when={listings().length > 0} fallback={fallback}>
          <Listings listings={listings()} edit={true} />
        </Show>
      </Show>
    </div>
  )
}

export default MyListings
