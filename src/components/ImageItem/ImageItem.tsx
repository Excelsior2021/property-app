import { Component } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { deleteImage } from "../../api/api-endpoints"
import {
  accessToken,
  currentListing,
  setCurrentListing,
} from "../../store/store"
import {
  setStoredImages,
  setUploadedImages,
} from "../ManageImages/ManageImages"
import { fetchListingDetails } from "../../api/api"
import { handleServerError } from "../../utils/utils"
import routes from "../../utils/client-routes"
import "./ImageItem.scss"

interface imageItemProps {
  image: any
  type: string
}

const ImageItem: Component<imageItemProps> = props => {
  let src
  let propertyId: string
  const navigate = useNavigate()
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
      let res
      try {
        res = await fetch(deleteImage, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${null}`,
          },
          body: JSON.stringify({
            imageId: props.image.id,
            propertyId: propertyId,
          }),
        })

        if (res.status === 201) {
          const updatedListing = await fetchListingDetails(propertyId)
          setStoredImages([])
          setUploadedImages([])
          setCurrentListing(updatedListing)
        } else throw new Error()
      } catch (error) {
        const { route } = handleServerError(res)
        if (route) navigate(routes.login)
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
