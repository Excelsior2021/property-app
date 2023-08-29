import {
  Component,
  createSignal,
  createEffect,
  For,
  createResource,
  Show,
  onCleanup,
} from "solid-js"
import { useNavigate, useParams } from "@solidjs/router"
import { createForm } from "@modular-forms/solid"
import { listingFormData } from "../ListingForm/ListingForm"
import { accessToken, currentListing, errorMessage } from "../../store/store"
import { editListing, listing, uploadImage } from "../../api/api-endpoints"
import ImageItem from "../ImageItem/ImageItem"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import routes from "../../utils/client-routes"
import { v4 as uuid } from "uuid"
import { handleServerError } from "../../utils/utils"
import "./ManageImages.scss"

interface manageImagesProps {
  page: string
  heading: string
}

type manageImagesForm = {
  upload: File
}

export const [uploadedImages, setUploadedImages] = createSignal([])
export const [storedImages, setStoredImages] = createSignal([])

const ManageImages: Component<manageImagesProps> = props => {
  const [manageImagesForm, { Field, Form }] = createForm<manageImagesForm>()
  const [propertyId, setPropertyId] = createSignal(null)
  const [submitted, setSubmitted] = createSignal(false)
  const [uploadLimit, setUploadLimit] = createSignal(false)
  const navigate = useNavigate()
  const params = useParams()
  let fileRef: HTMLInputElement
  let apiMethod: string
  let apiRoute: string

  if (props.page === "new") {
    apiMethod = "POST"
    apiRoute = listing
  }
  if (props.page === "edit") {
    apiMethod = "PATCH"
    apiRoute = editListing(params.id)
  }

  createEffect(() => {
    if (props.page === "edit") {
      setPropertyId(params.id)

      const { images } = currentListing()

      for (const image of images)
        setStoredImages(prevState => [...prevState, image])
    }
  })

  onCleanup(() => {
    setStoredImages([])
    setUploadedImages([])
  })

  const handleUpload = () => {
    console.log(typeof fileRef)
    setUploadLimit(false)
    if (
      fileRef.files.length + storedImages().length > 5 ||
      fileRef.files.length + uploadedImages().length > 5
    ) {
      setUploadLimit(true)
      return
    }
    for (const file of fileRef.files)
      setUploadedImages(prevState => [...prevState, { id: uuid(), file }])
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    let res

    for (const file of uploadedImages()) {
      formData.append("images", file.file)
    }

    try {
      res = await fetch(apiRoute, {
        method: apiMethod,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken()}`,
        },
        body: JSON.stringify(listingFormData()),
      })

      if (res.status === 201) {
        if (props.page === "new") {
          const data = await res.json()
          setPropertyId(data.propertyId)
        }
      } else throw new Error()
    } catch (error) {
      const { route } = handleServerError(res)
      if (route) navigate(route)
    }

    try {
      if (
        (propertyId() && props.page === "new") ||
        (propertyId() && props.page === "edit" && uploadedImages().length > 0)
      ) {
        res = await fetch(uploadImage(propertyId()!), {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken()}`,
          },
        })
      }

      if (res.status === 201) navigate(routes.myListings)
      else throw new Error()
    } catch (error) {
      const { route } = handleServerError(res)
      if (route) navigate(route)
    }
  }

  const handleReturn = () => {
    if (props.page === "new") navigate(routes.newListing)
    if (props.page === "edit")
      navigate(`${routes.editListing}/${currentListing().listing.id}`)
  }

  const [submittedListing] = createResource(submitted, handleSubmit)

  return (
    <div class="manage-images">
      <Show when={!submittedListing.loading} fallback={<LoadingSpinner />}>
        <Form
          class="manage-images__form"
          onSubmit={() => {
            setSubmitted(true)
          }}>
          <h2 class="manage-images__heading manage-images__heading--main">
            {props.heading}
          </h2>
          <Field name="upload">
            {(field, fieldProps) => (
              <input
                {...fieldProps}
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
          {uploadLimit() && (
            <p class="manage-images__text">
              You can only have a max. of 5 images per listing
            </p>
          )}
          {storedImages().length > 0 && props.page === "edit" && (
            <div class="manage-images__stored">
              <h2 class="manage-images__heading">existing images</h2>
              <div class="manage-images__images">
                <For each={storedImages()}>
                  {image => <ImageItem image={image} type="stored" />}
                </For>
              </div>
            </div>
          )}
          {uploadedImages().length > 0 && (
            <div class="manage-images__uploaded">
              {props.page === "edit" && (
                <h2 class="manage-images__heading">new images</h2>
              )}
              <div class="manage-images__images">
                <For each={uploadedImages()}>
                  {image => <ImageItem image={image} type="uploaded" />}
                </For>
              </div>
            </div>
          )}
          <div class="manage-images__actions">
            <button class="manage-images__button" onclick={handleReturn}>
              back
            </button>
            <button class="manage-images__button">submit</button>
          </div>
        </Form>
      </Show>
    </div>
  )
}

export default ManageImages
