import { Component, For, createSignal } from "solid-js"
import { imageObjType, listingType } from "../../types/general"
import "./ImageContainer.scss"

interface ImageContainerProps {
  images: imageObjType[]
  handleNavigate?: (e: Event, requestPage: string) => void
  handleDelete?: (e: Event) => void
  edit?: boolean
  delete?: boolean
}

const ImageContainer: Component<ImageContainerProps> = props => {
  const [hovered, setHovered] = createSignal(false)

  const handleHover = () => {
    setHovered(!hovered())
  }

  return (
    <div
      class="image-container"
      onmouseover={handleHover}
      onmouseout={handleHover}>
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
        <>
          <div class="image-container__dots">
            <For each={props.images}>
              {_ => <span class="image-container__dot"></span>}
            </For>
          </div>

          <div
            class={
              hovered()
                ? "image-container__actions"
                : "image-container__actions--hide"
            }>
            <div class="image-container__actions--prev"></div>
            <div class="image-container__actions--next"></div>
          </div>
        </>
      ) : null}

      {props.edit && (
        <div
          class="image-container__edit-container"
          onclick={e => props.handleNavigate(e, "edit")}>
          <img
            src="/icons/edit.svg"
            alt="edit listing"
            class="image-container__icon image-container__icon--edit"
          />
        </div>
      )}

      {props.delete && (
        <div
          class="image-container__delete-container"
          onclick={e => props.handleDelete(e)}>
          <img
            src="/icons/delete-image.svg"
            alt="delete listing"
            class="image-container__icon image-container__icon--edit"
          />
        </div>
      )}
    </div>
  )
}

export default ImageContainer
