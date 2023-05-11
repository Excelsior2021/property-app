import { Component, Show, createEffect, createSignal } from "solid-js"
import { useParams } from "@solidjs/router"
import "./Property.scss"

const Property: Component = () => {
  const [property, setProperty] = createSignal(null)
  const params = useParams()

  createEffect(async () => {
    const property = await fetch(
      `http://localhost:5050/property/${params.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    setProperty(await property.json())
  })

  return (
    <div class="property">
      <Show when={property()}>
        <img class="property__img" src={property().img} alt="property" />
        <div class="property__details">
          <p class="property__location">ghana</p>
          <p class="property__type">house</p>
          <p class="property__rate">Gh₵2000 p/m</p>
        </div>
      </Show>
    </div>
  )
}

export default Property
