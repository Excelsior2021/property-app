import { Component } from "solid-js"
import { propertyDetailsType } from "../../types/general"
import "./PropertyDetails.scss"

interface PropertyDetailsProps {
  propertyDetails: propertyDetailsType
}

const PropertyDetails: Component<PropertyDetailsProps> = props => {
  return (
    <div class="property-details">
      <p class="property-details__location">{props.propertyDetails.location}</p>
      <p class="property-details__price">
        Gh₵{props.propertyDetails.price} p/m
      </p>
    </div>
  )
}

export default PropertyDetails
