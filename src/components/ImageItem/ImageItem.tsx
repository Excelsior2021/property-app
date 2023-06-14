import { Component } from "solid-js"
import "./ImageItem.scss"

const ImageItem: Component = props => {
  return (
    <div class="image-item">
      <div class="image-item__img-container">
        <img
          src={URL.createObjectURL(props.image)}
          alt="listing image"
          class="image-item__img"
        />
      </div>
      <div class="image-item__actions">
        <img
          src="./icons/delete-image.svg"
          alt="delete image icon"
          class="image-item__icon"
        />
      </div>
    </div>
  )
}

export default ImageItem
