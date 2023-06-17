import { Component, createEffect } from "solid-js"
import { deleteImage } from "../../api/api-endpoints"
import {
  accessToken,
  currentListing,
  setCurrentListing,
} from "../../store/store"
import "./ImageItem.scss"
import {
  setStoredImages,
  setUploadedImages,
} from "../ManageImages/ManageImages"
import { getListing } from "../../api/api"

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
    propertyId = currentListing().property.id
  }

  const handleDelete = async () => {
    if (props.type === "uploaded") {
      setUploadedImages(prevState =>
        prevState.filter(image => image.id !== props.image.id)
      )
    }

    if (props.type === "stored") {
      try {
        const res = await fetch(deleteImage, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken()}`,
          },
          body: JSON.stringify({
            imageId: props.image.id,
            propertyId: propertyId,
          }),
        })

        const updatedListing = await getListing(propertyId)
        setStoredImages([])
        setUploadedImages([])
        setCurrentListing(updatedListing)
      } catch (error) {
        console.log(error)
      }
    }
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
