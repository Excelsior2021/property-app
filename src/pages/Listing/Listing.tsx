import { Component, Show, createEffect, createSignal } from "solid-js"
import { useParams } from "@solidjs/router"
import { accessToken } from "../../store/store"
import ImageContainer from "../../components/ImageContainer/ImageContainer"
import { getListingDetails } from "../../api/api-endpoints"
import "./Listing.scss"

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
    console.log(data)
    setListingImages(data.images)
    setListingDetails(data.property.propertyDetails)
  })

  return (
    <div class="listing">
      <Show when={listingImages() && listingDetails()}>
        <p class="listing__title">{listingDetails().title}</p>

        <ImageContainer images={listingImages()} />

        <div class="listing__details">
          <p class="listing__location">{listingDetails().location}</p>
          <p class="listing__price">Gh₵{listingDetails().price} p/m</p>
          <p class="listing__description">{listingDetails().description}</p>
          <p class="listing__phone">{listingDetails().phone}</p>
        </div>
      </Show>
    </div>
  )
}

export default Listing
