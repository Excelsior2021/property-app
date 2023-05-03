import { Component, createSignal } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { propertyType } from "../../types/general"
import PropertyDetails from "../PropertyDetails/PropertyDetails"
import "./PropertyItem.scss"

interface PropertyItemProps {
  property: propertyType
}

const PropertyItem: Component<PropertyItemProps> = props => {
  const [saveActive, setSaveActive] = createSignal(props.property.saved)
  const navigate = useNavigate()

  const handleSave = async (event, property) => {
    event.stopPropagation()

    const saved = await fetch("http://localhost:5050/save-property", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    })

    setSaveActive(await saved.json())
  }

  const handleNavigate = () => {
    navigate(`/property/${props.property.id}`)
  }

  return (
    <li class="property-item" onclick={handleNavigate}>
      <img class="property-item__img" src={props.property.img} alt="property" />
      <img
        class="property-item__icon"
        src={saveActive() ? "./icons/saved-active.svg" : "./icons/saved.svg"}
        alt="save property"
        onclick={event => handleSave(event, props.property)}
      />

      <div class="property-item__details">
        <PropertyDetails property={props.property} />
      </div>
    </li>
  )
}

export default PropertyItem
