import { Component } from "solid-js"
import {
  currentListing,
  setModal,
  setModalOverlayData,
} from "../../store/store"
import { handleDeleteImage } from "../../api/api"
import "./ImageItem.scss"

interface imageItemProps {
  image: any
  type: string
}

const ImageItem: Component<imageItemProps> = props => {
  let src
  let propertyId: string
  if (props.type === "uploaded") src = URL.createObjectURL(props.image.file)
  if (props.type === "stored") {
    src = props.image.path
    propertyId = currentListing().listing.id
  }

  const handleDelete = async () => {
    setModal(true)
    setModalOverlayData({
      message:
        "Are you sure you want to delete this image? This can not be undone.",
      buttonText: "delete",
      buttonHandler: () =>
        handleDeleteImage(props.type, props.image.id, propertyId),
    })
  }

  return (
    <div class="image-item">
      <div class="image-item__img-container">
        <img src={src} alt="listing image" class="image-item__img" />
      </div>
      <div class="image-item__actions">
        <img
          src="/icons/delete-image.svg"
          alt="delete image icon"
          class="image-item__icon"
          onclick={handleDelete}
        />
      </div>
    </div>
  )
}

export default ImageItem
