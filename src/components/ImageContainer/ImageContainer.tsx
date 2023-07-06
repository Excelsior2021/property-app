import { Component, createSignal, For } from "solid-js"
import { Slider, SliderProvider, SliderButton } from "solid-slider"
import { imageObjType } from "../../types/general"
import "./ImageContainer.scss"

interface ImageContainerProps {
  images: imageObjType[]
  handleNavigate?: (event: Event, requestPage: string) => void
  edit?: boolean
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
      <SliderProvider>
        <Slider>
          <For each={props.images}>
            {image => (
              <img
                class="image-container__img"
                src={image.path}
                alt="listing images carousel"
              />
            )}
          </For>
        </Slider>
        {props.images.length > 1 ? (
          <div onclick={e => e.stopPropagation()}>
            <SliderButton
              prev
              class={`image-container__button image-container__button--prev ${
                hovered() ? "image-container__button--show" : ""
              }`}>
              Prev
            </SliderButton>
            <SliderButton
              next
              class={`image-container__button image-container__button--next ${
                hovered() ? "image-container__button--show" : ""
              }`}>
              Next
            </SliderButton>
          </div>
        ) : null}
      </SliderProvider>

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
