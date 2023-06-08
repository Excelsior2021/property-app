import { Component, createSignal, createEffect, For } from "solid-js"
import PropertyItem from "../../components/ListingItem/ListingItem"

const SavedListings: Component = () => {
  const [properties, setProperties] = createSignal(null)

  createEffect(async () => {
    const data = await fetch("http://localhost:5050/properties")
    setProperties(await data.json())
  })

  return (
    <div class="saved-properties">
      <h1 class="page__heading">Saved Properties</h1>
      <ul class="property-listings">
        <For each={properties()}>
          {property =>
            property.saved ? <PropertyItem property={property} /> : null
          }
        </For>
      </ul>
    </div>
  )
}

export default SavedListings
