import { Component } from "solid-js"
import { propertyType } from "../../types/general"
import PropertyDetails from "../PropertyDetails/PropertyDetails"
import "./PropertyItem.scss"

interface PropertyItemProps {
  property: propertyType
}

const PropertyItem: Component<PropertyItemProps> = props => {
  return (
    <li class="property-item">
      <img class="property-item__img" src={props.property.img} alt="property" />

      <div class="property-item__details">
        <PropertyDetails property={props.property} />
      </div>
    </li>
  )
}

export default PropertyItem
