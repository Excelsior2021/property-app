import { Component } from "solid-js"
import { useParams } from "@solidjs/router"
import "./Property.scss"

const Property: Component = () => {
  const params = useParams()

  return (
    <div>
      <h2>Property</h2>
    </div>
  )
}

export default Property
