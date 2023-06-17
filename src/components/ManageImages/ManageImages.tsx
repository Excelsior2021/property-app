import { Component, createSignal, createEffect, For } from "solid-js"
import { useNavigate, useParams } from "@solidjs/router"
import { createForm, Field, Form } from "@modular-forms/solid"
import { listingFormData } from "../ListingForm/ListingForm"
import { accessToken, currentListing } from "../../store/store"
import { editListing, listing, uploadImage } from "../../api/api-endpoints"
import ImageItem from "../ImageItem/ImageItem"
import routes from "../../utils/client-routes"
import { v4 as uuid } from "uuid"
import "./ManageImages.scss"

interface manageImagesProps {
  page: string
}

type manageImagesForm = {
  upload: File
}

export const [uploadedImages, setUploadedImages] = createSignal([])
export const [storedImages, setStoredImages] = createSignal([])

const ManageImages: Component<manageImagesProps> = props => {
  const manageImagesForm = createForm<manageImagesForm>()
  const [propertyId, setPropertyId] = createSignal(null)
  const navigate = useNavigate()
  const params = useParams()
  let fileRef
  let propertyDetailsMethod: string
  let submitEndpoint: string

  if (props.page === "new") {
    propertyDetailsMethod = "POST"
    submitEndpoint = listing
  }
  if (props.page === "edit") {
    propertyDetailsMethod = "PATCH"
    submitEndpoint = editListing(params.id)
  }

  createEffect(() => {
    setStoredImages([])
    setUploadedImages([])
    if (props.page === "edit") {
      setPropertyId(params.id)

      const { images } = currentListing()
      for (const image of images)
        setStoredImages(prevState => [...prevState, image])
    }
  })

  const handleUpload = () => {
    for (const file of fileRef.files) {
      setUploadedImages(prevState => [...prevState, { id: uuid(), file }])
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData()

    for (const file of uploadedImages()) {
      formData.append("images", file.file)
    }

    try {
      const res = await fetch(submitEndpoint, {
        method: propertyDetailsMethod,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken()}`,
        },
        body: JSON.stringify(listingFormData()),
      })

      if (props.page === "new") {
        const data = await res.json()
        setPropertyId(data.propertyId)
      }
    } catch (error) {
      console.log(error)
    }

    try {
      if (
        (propertyId() && props.page === "new") ||
        (propertyId() && props.page === "edit" && uploadedImages().length > 0)
      ) {
        const res = await fetch(uploadImage(propertyId()!), {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken()}`,
          },
        })
      }

      navigate(routes.myListings)
    } catch (error) {
      console.log(error)
    }
  }

  const handleReturn = () => {
    if (props.page === "new") navigate(routes.newListing)
    if (props.page === "edit")
      navigate(`${routes.editListing}/${currentListing().property.id}`)
  }

  return (
    <div class="manage-images">
      <Form
        of={manageImagesForm}
        class="manage-images__form"
        onSubmit={handleSubmit}>
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
        <div class="manage-images__stored">
          {storedImages().length > 0 && (
            <h2 class="manage-images__heading">existing images</h2>
          )}
          <For each={storedImages()}>
            {image => <ImageItem image={image} type="stored" />}
          </For>
        </div>
        <div class="manage-images__uploaded">
          {uploadedImages().length > 0 && (
            <h2 class="manage-images__heading">new images</h2>
          )}
          <For each={uploadedImages()}>
            {image => <ImageItem image={image} type="uploaded" />}
          </For>
        </div>
        <div class="manage-images__actions">
          <button class="manage-images__button" onclick={handleReturn}>
            back
          </button>
          <button class="manage-images__button">submit</button>
        </div>
      </Form>
    </div>
  )
}

export default ManageImages
