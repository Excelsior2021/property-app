import { Component, createSignal, For } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { createForm, Field, Form } from "@modular-forms/solid"
import {
  initialListingFormData,
  listingFormData,
  setListingFormData,
} from "../ListingForm/ListingForm"
import { accessToken } from "../../store/store"
import { listing, uploadImage } from "../../api/api-endpoints"
import ImageItem from "../ImageItem/ImageItem"
import "./ManageImages.scss"

interface manageImagesProps {
  page: string
}

type manageImagesForm = {
  upload: File
}

const ManageImages: Component<manageImagesProps> = props => {
  const manageImagesForm = createForm<manageImagesForm>()
  const [propertyId, setPropertyId] = createSignal(null)
  const [uploadedImages, setUploadedImages] = createSignal([])
  const navigate = useNavigate()
  let fileRef

  const handleUpload = () => {
    for (const file of fileRef.files) {
      setUploadedImages(prevState => [...prevState, file])
    }
  }

  const uploadImages = () => handleSubmit(fileRef.files)

  const handleSubmit = async files => {
    const formData = new FormData()

    for (const file of files) {
      formData.append("images", file)
    }

    try {
      const res = await fetch(listing, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken()}`,
        },
        body: JSON.stringify(listingFormData()),
      })
      const data = await res.json()
      setPropertyId(data.propertyId)
    } catch (error) {
      console.log(error)
    }

    try {
      if (propertyId()) {
        const res = await fetch(uploadImage(propertyId()!), {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken()}`,
          },
        })
      }
      setListingFormData(initialListingFormData)
      navigate("/my-listings")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div class="manage-images">
      <Form
        of={manageImagesForm}
        class="manage-images__form"
        onSubmit={uploadImages}>
        <Field of={manageImagesForm} name="upload">
          {field => (
            <input
              {...field.props}
              id="upload"
              class="manage-images__input"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              multiple
              ref={fileRef}
              onchange={handleUpload}
            />
          )}
        </Field>
        <div>
          <For each={uploadedImages()}>
            {image => <ImageItem image={image} />}
          </For>
        </div>
        <div class="manage-images__actions">
          <button
            class="manage-images__button"
            onclick={() => navigate("/new-listing")}>
            back
          </button>
          <button class="manage-images__button" onsubmit={handleSubmit}>
            submit
          </button>
        </div>
      </Form>
    </div>
  )
}

export default ManageImages
