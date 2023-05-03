import { Component } from "solid-js"
import { propertyType } from "../../types/general"
import "./PropertyDetails.scss"

interface PropertyDetailsProps {
  property: propertyType
}

const PropertyDetails: Component<PropertyDetailsProps> = props => {
  return (
    <div class="property-details">
      <p class="property-details__location">{props.property.location}</p>
      <p class="property-details__type">{props.property.type}</p>
      <p class="property-details__rate">Gh₵{props.property.rate} p/m</p>
    </div>
  )
}

export default PropertyDetails
