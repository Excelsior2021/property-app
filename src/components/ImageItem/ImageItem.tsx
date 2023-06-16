import { Component, createEffect } from "solid-js"
import { deleteImage } from "../../api/api-endpoints"
import { accessToken, currentListing } from "../../store/store"
import "./ImageItem.scss"

interface imageItemProps {
  image: any
  type: string
}

const ImageItem: Component<imageItemProps> = props => {
  let src
  if (props.type === "uploaded") src = URL.createObjectURL(props.image)
  if (props.type === "stored") src = props.image.path
  const {
    property: { id },
  } = currentListing()

  const handleDelete = async () => {
    try {
      const res = await fetch(deleteImage, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken()}`,
        },
        body: JSON.stringify({
          imageId: props.image.id,
          propertyId: id,
        }),
      })

      console.log(await res)
    } catch (error) {
      console.log(error)
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
