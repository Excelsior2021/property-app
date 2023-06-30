import { Component, createEffect, createSignal } from "solid-js"
import { createForm, required } from "@modular-forms/solid"
import { useNavigate, useParams } from "@solidjs/router"
import { handleFormInput, handleServerError } from "../../utils/utils"
import { listingDataType } from "../../types/general"
import { editListing } from "../../api/api-endpoints"
import { accessToken } from "../../store/store"
import CancelButton from "../CancelButton/CancelButton"
import routes from "../../utils/client-routes"
import "./ListingForm.scss"

interface listingFormProps {
  listing: listingDataType
  page: string
}

type listingForm = {
  title: string
  description: string
  price: number
  location: string
  phone: string
}

export const initialListingFormData = {
  id: "",
  email: "",
  title: "",
  description: "",
  price: NaN,
  location: "",
  phone: "",
}

export const [listingFormData, setListingFormData] = createSignal(
  initialListingFormData
)

const ListingForm: Component<listingFormProps> = props => {
  const [listingForm, { Field, Form }] = createForm<listingForm>()
  const navigate = useNavigate()
  const params = useParams()
  const subActionsClass = "listing-form__actions--sub"
  const cancelButtonClass = "listing-form__button--cancel"

  createEffect(() => {
    if (props.page === "edit") {
      for (const property in initialListingFormData) {
        setListingFormData(prevState => ({
          ...prevState,
          [property]: props.listing[property],
        }))
      }
    }
  })

  const handleFormSubmission = () => {
    if (props.page === "new") navigate(routes.uploadImages)
    if (props.page === "edit") handleSave()
  }

  const handleSave = async () => {
    let res
    try {
      res = await fetch(editListing(params.id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken()}`,
        },
        body: JSON.stringify(listingFormData()),
      })
      if (res.status === 201) navigate(routes.myListings)
      else throw new Error()
    } catch (error) {
      const { route } = handleServerError(res)
      if (route) navigate(route)
    }
  }

  const handleCancel = () => {
    if (props.page === "new") navigate(routes.profile)
    if (props.page === "edit") navigate(routes.myListings)
  }

  return (
    <div class="listing-form">
      <Form class="listing-form__form" onSubmit={handleFormSubmission}>
        <Field name="title" validate={[required("please provide a title")]}>
          {(field, fieldProps) => (
            <>
              <input
                {...fieldProps}
                class="listing-form__input"
                type="text"
                placeholder="title"
                value={props.listing.title}
                onchange={event => handleFormInput(event, setListingFormData)}
                required
              />
              {field.error && <p class="listing-form__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field name="price" validate={[required("please provide a price")]}>
          {(field, fieldProps) => (
            <>
              <input
                {...fieldProps}
                class="listing-form__input"
                type="number"
                placeholder="price"
                min="1"
                value={props.listing.price}
                onchange={event => handleFormInput(event, setListingFormData)}
                required
              />
              {field.error && <p class="listing-form__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          name="description"
          validate={[required("please provide a description")]}>
          {(field, fieldProps) => (
            <>
              <textarea
                {...fieldProps}
                class="listing-form__input"
                placeholder="description"
                value={props.listing.description}
                onchange={event => handleFormInput(event, setListingFormData)}
                required
                cols="30"
                rows="10"></textarea>
              {field.error && <p class="listing-form__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          name="location"
          validate={[required("please provide a location")]}>
          {(field, fieldProps) => (
            <>
              <input
                {...fieldProps}
                class="listing-form__input"
                type="text"
                placeholder="location"
                value={props.listing.location}
                onchange={event => handleFormInput(event, setListingFormData)}
                required
              />
              {field.error && <p class="listing-form__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          name="phone"
          validate={[required("please provide a contact number")]}>
          {(field, fieldProps) => (
            <>
              <input
                {...fieldProps}
                class="listing-form__input"
                type="tel"
                placeholder="contact number"
                value={props.listing.phone}
                onchange={event => handleFormInput(event, setListingFormData)}
                required
              />
              {field.error && <p class="listing-form__error">{field.error}</p>}
            </>
          )}
        </Field>
        <div class="listing-form__actions">
          {props.page === "new" && (
            <div class={subActionsClass}>
              <button class="listing-form__button">next</button>
              <CancelButton
                handleCancel={handleCancel}
                styles={cancelButtonClass}
              />
            </div>
          )}
          {props.page === "edit" && (
            <>
              <button
                class="listing-form__button listing-form__button--manage"
                onclick={() =>
                  navigate(`${routes.manageImages}/${props.listing.id}`)
                }>
                manage images
              </button>
              <div class={subActionsClass}>
                <button
                  class="listing-form__button listing-form__button--save"
                  onclick={handleSave}>
                  save changes
                </button>
                <CancelButton
                  handleCancel={handleCancel}
                  styles={cancelButtonClass}
                />
              </div>
            </>
          )}
        </div>
      </Form>
    </div>
  )
}

export default ListingForm
