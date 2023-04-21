import { Component, createSignal, createEffect, For } from "solid-js"
import PropertyItem from "../../components/PropertyItem/PropertyItem"

const SavedProperties: Component = () => {
  const [properties, setProperties] = createSignal(null)

  createEffect(async () => {
    const data = await fetch("http://localhost:8080/properties")
    setProperties(await data.json())
  }, [])

  return (
    <ul>
      <For each={properties()}>
        {property =>
          property.saved ? <PropertyItem property={property} /> : null
        }
      </For>
    </ul>
  )
}

export default SavedProperties
