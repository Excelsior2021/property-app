import { Component } from "solid-js"
import "./AddProperty.scss"

const AddProperty: Component = () => {
  return (
    <div class="add-property">
      <h2>Add a Property</h2>
      <input
        id="input"
        name="input"
        class="add-property__input"
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        multiple
      />
    </div>
  )
}

export default AddProperty
