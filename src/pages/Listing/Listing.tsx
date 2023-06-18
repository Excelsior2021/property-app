import { Component, Show, createEffect, createSignal } from "solid-js"
import { useParams } from "@solidjs/router"
import { accessToken } from "../../store/store"
import ImageContainer from "../../components/ImageContainer/ImageContainer"
import { getListingDetails } from "../../api/api-endpoints"
import "./Listing.scss"
import ListingDetails from "../../components/ListingDetails/ListingDetails"

const Listing: Component = () => {
  const [listingImages, setListingImages] = createSignal(null)
  const [listingDetails, setListingDetails] = createSignal(null)
  const params = useParams()

  createEffect(async () => {
    const res = await fetch(getListingDetails(params.id), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken()}`,
      },
    })
    const data = await res.json()
    setListingImages(data.images)
    setListingDetails(data.property.propertyDetails)
  })

  return (
    <div class="listing">
      <Show when={listingImages() && listingDetails()}>
        <p class="listing__title">{listingDetails().title}</p>

        <ImageContainer images={listingImages()} />

        <ListingDetails listingDetails={listingDetails()} />
      </Show>
    </div>
  )
}

export default Listing
