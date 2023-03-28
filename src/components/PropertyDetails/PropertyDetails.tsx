import { Component } from "solid-js"
import "./PropertyDetails.scss"

const PropertyDetails: Component = props => {
  return (
    <div class="property-details">
      <p class="property-details__location">{props.property.location}</p>
      <p class="property-details__type">{props.property.type}</p>
      <p class="property-details__rate">Gh₵{props.property.rate}</p>
    </div>
  )
}

export default PropertyDetails
