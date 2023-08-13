import { Component, createResource, Show } from "solid-js"
import { useNavigate } from "@solidjs/router"
import Listings from "../../components/Listings/Listings"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { accessToken } from "../../store/store"
import { listing } from "../../api/api-endpoints"
import { handleServerError } from "../../utils/utils"
import routes from "../../utils/client-routes"
import {
  initialListingFormData,
  setListingFormData,
} from "../../components/ListingForm/ListingForm"
import "./MyListings.scss"

const MyListings: Component = () => {
  const navigate = useNavigate()

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

  const [listings, { mutate, refetch }] = createResource(fetchListings)

  const handleNewListing = () => {
    setListingFormData(initialListingFormData)
    navigate(routes.newListing)
  }

  const fallback = (
    <>
      <p class="my-listings__fallback-text">
        You do not have any listings. Would you like to create one?
      </p>
      <button class="my-listings__fallback-button" onclick={handleNewListing}>
        new listing
      </button>
    </>
  )

  return (
    <div class="my-listings">
      <Show when={!listings.loading} fallback={<LoadingSpinner />}>
        <Show when={listings().length > 0} fallback={fallback}>
          <Listings
            listings={listings()}
            page={routes.myListings}
            heading="my listings"
            edit={true}
            delete={true}
            refetch={refetch}
          />
        </Show>
      </Show>
    </div>
  )
}

export default MyListings
