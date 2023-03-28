import { Component } from "solid-js"
import PropertyDetails from "../PropertyDetails/PropertyDetails"
import "./PropertyItem.scss"

const PropertyItem: Component = props => {
  return (
    <li class="property-item">
      <img class="property-item__img" src={props.property.img} alt="property" />

      <PropertyDetails property={props.property} />
    </li>
  )
}

export default PropertyItem
