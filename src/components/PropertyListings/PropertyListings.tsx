import { Component, createEffect, createSignal, For } from "solid-js"
import PropertyItem from "../PropertyItem/PropertyItem"
import "./PropertyListings.scss"

const PropertyListings: Component = () => {
  const [properties, setProperties] = createSignal(null)

  createEffect(async () => {
    const data = await fetch("http://localhost:5050/properties")
    setProperties(await data.json())
  }, [])

  return (
    <ul class="property-listings">
      <For each={properties()}>
        {property => <PropertyItem property={property} />}
      </For>
    </ul>
  )
}

export default PropertyListings
