import { Component, createSignal, createEffect } from "solid-js"
import { propertyType } from "../../types/general"
import PropertyDetails from "../PropertyDetails/PropertyDetails"
import "./PropertyItem.scss"

interface PropertyItemProps {
  property: propertyType
}

const PropertyItem: Component<PropertyItemProps> = props => {
  const [saveActive, setSaveActive] = createSignal(props.property.saved)

  const handleSave = async property => {
    const saved = await fetch("http://localhost:8080/save-property", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    })

    setSaveActive(await saved.json())
  }

  return (
    <li class="property-item">
      <img class="property-item__img" src={props.property.img} alt="property" />
      <img
        class="property-item__icon"
        src={saveActive() ? "./icons/saved-active.svg" : "./icons/saved.svg"}
        alt="save property"
        onclick={() => handleSave(props.property)}
      />

      <div class="property-item__details">
        <PropertyDetails property={props.property} />
      </div>
    </li>
  )
}

export default PropertyItem
