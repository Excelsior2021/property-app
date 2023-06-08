import { Component, For } from "solid-js"
import { imageObjType } from "../../types/general"
import "./ImageContainer.scss"

interface ImageContainerProps {
  images: imageObjType[]
}

const ImageContainer: Component<ImageContainerProps> = props => {
  return (
    <div class="image-container">
      <div class="image-container__list">
        <For each={props.images}>
          {image => (
            <img
              class="image-container__img"
              src={image.path}
              alt="listing images carousel"
            />
          )}
        </For>
      </div>

      {props.images.length > 1 ? (
        <div class="image-container__dots">
          <For each={props.images}>
            {_ => <span class="image-container__dot"></span>}
          </For>
        </div>
      ) : null}
    </div>
  )
}

export default ImageContainer
