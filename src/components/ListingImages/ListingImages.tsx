import { Component, createSignal } from "solid-js"
import { imageObjType } from "../../types/general"
import "./ListingImages.scss"

interface listingImagesProps {
  images: imageObjType
}

const ListingImages: Component<listingImagesProps> = props => {
  const imagesObj = {
    image0: "/no-image.png",
    image1: "/no-image.png",
    image2: "/no-image.png",
    image3: "/no-image.png",
    image4: "/no-image.png",
  }
  const [images, setImages] = createSignal(imagesObj)

  for (const i in props.images)
    setImages(prev => ({ ...prev, [`image${i}`]: props.images[i].path }))

  return (
    <div class="listing-images">
      <div class="listing-images__img-container listing-images__img-container--main">
        <img
          src={images().image0}
          alt="listing image"
          class="listing-images__img"
        />
      </div>
      <div class="listing-images__img-containers">
        <div class="listing-images__img-container listing-images__img-container--top">
          <img
            src={images().image1}
            alt="listing image"
            class="listing-images__img"
          />
          <img
            src={images().image2}
            alt="listing image"
            class="listing-images__img"
          />
        </div>
        <div class="listing-images__img-container listing-images__img-container--bottom">
          <img
            src={images().image3}
            alt="listing image"
            class="listing-images__img"
          />
          <img
            src={images().image4}
            alt="listing image"
            class="listing-images__img"
          />
        </div>
      </div>
    </div>
  )
}

export default ListingImages
