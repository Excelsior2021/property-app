import { Component, For } from "solid-js"
import { imageObjType } from "../../types/general"
import "./ImageContainer.scss"

interface ImageContainerProps {
  images: imageObjType[]
  handleNavigate?: (event: Event, requestPage: string) => void
  edit?: boolean
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

      {props.edit && (
        <div
          class="image-container__edit-container"
          onclick={event => props.handleNavigate(event, "edit")}>
          <img
            src="/icons/edit.svg"
            alt="edit listing"
            class="image-container__icon image-container__icon--edit"
          />
        </div>
      )}
    </div>
  )
}

export default ImageContainer
