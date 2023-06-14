import { Component, createSignal, createEffect } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { createForm, Field, Form } from "@modular-forms/solid"
import {
  initialListingFormData,
  listingFormData,
  setListingFormData,
} from "../../components/ListingForm/ListingForm"
import { accessToken } from "../../store/store"
import { listing, uploadImage } from "../../api/api-endpoints"
import ImageItem from "../../components/ImageItem/ImageItem"
import "./UploadImages.scss"

type uploadImagesForm = {
  upload: File
}

const uploadImages: Component = () => {
  const uploadImagesForm = createForm<uploadImagesForm>()
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
    <div class="upload-images">
      <h2>Upload Images</h2>
      <Form
        of={uploadImagesForm}
        class="upload-images__form"
        onSubmit={uploadImages}>
        <Field of={uploadImagesForm} name="upload">
          {field => (
            <input
              {...field.props}
              id="upload"
              class="upload-images__input"
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
        <div class="upload-images__actions">
          <button
            class="upload-images__button"
            onclick={() => navigate("/new-listing")}>
            back
          </button>
          <button class="upload-images__button" onsubmit={handleSubmit}>
            submit
          </button>
        </div>
      </Form>
    </div>
  )
}

export default uploadImages
