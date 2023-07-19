import { Component, For, createSignal } from "solid-js"
import { imageObjType } from "../../types/general"
import "./ListingImages.scss"

interface listingImagesProps {
  images: imageObjType
}

const ListingImages: Component<listingImagesProps> = props => {
  return (
    <div class="listing-images">
      <For each={props.images}>
        {(image, i) => {
          const type = i() === 0 ? "main" : "sub"
          return (
            <img
              src={image.path}
              alt="listing image"
              class={`listing-images__img listing-images__img--${type} listing-images__img--${i()}`}
            />
          )
        }}
      </For>
    </div>
  )
}

export default ListingImages
