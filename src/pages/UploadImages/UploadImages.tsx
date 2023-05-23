import { Component, createSignal } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { createForm, Field, Form } from "@modular-forms/solid"
import { newListingFormData } from "../NewListing/NewListing"
import { accessToken } from "../../store/store"
import "./UploadImages.scss"

type uploadImagesForm = {
  upload: File
}

const uploadImages: Component = () => {
  const uploadImagesForm = createForm<uploadImagesForm>()
  const [propertyID, setPropertyID] = createSignal(null)
  const navigate = useNavigate()
  let fileRef

  const uploadImages = () => handleUpload(fileRef.files)

  const handleUpload = async files => {
    const formData = new FormData()

    for (const file of files) {
      formData.append("images", file)
    }

    try {
      const res = await fetch("http://localhost:8080/property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken()}`,
        },
        body: JSON.stringify(newListingFormData()),
      })
      setPropertyID(await res.json())
    } catch (error) {
      console.log(error)
    }

    try {
      const res = await fetch(
        `http://localhost:8080/upload?propertyId=${propertyID()}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken()}`,
          },
        }
      )

      console.log(await res)
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
            />
          )}
        </Field>
        <div class="upload-images__actions">
          <button
            class="upload-images__button"
            onclick={() => navigate("/new-listing")}>
            back
          </button>
          <button class="upload-images__button" onsubmit={handleUpload}>
            submit
          </button>
        </div>
      </Form>
    </div>
  )
}

export default uploadImages
