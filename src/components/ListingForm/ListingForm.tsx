import { Component, createEffect, createSignal } from "solid-js"
import { createForm, Field, Form, required } from "@modular-forms/solid"
import { useNavigate, useParams } from "@solidjs/router"
import { handleFormInput } from "../../utils/utils"
import { listingDetailsType } from "../../types/general"
import { editListing } from "../../api/api-endpoints"
import { accessToken } from "../../store/store"
import CancelButton from "../CancelButton/CancelButton"
import routes from "../../utils/client-routes"
import "./ListingForm.scss"

interface listingFormProps {
  listingDetails: listingDetailsType
  listingId?: string
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
  const listingForm = createForm<listingForm>()
  const [serverError, setServerError] = createSignal(false)
  const navigate = useNavigate()
  const params = useParams()
  const subActionsClass = "listing-form__actions--sub"
  const cancelButtonClass = "listing-form__button--cancel"

  createEffect(() => {
    if (props.page === "edit") {
      for (const property in initialListingFormData) {
        setListingFormData(prevState => ({
          ...prevState,
          [property]: props.listingDetails[property],
        }))
      }
    }
  })

  const handleFormSubmission = () => {
    if (props.page === "new") navigate(routes.uploadImages)
    if (props.page === "edit") handleSave()
  }

  const handleSave = async () => {
    try {
      const res = await fetch(editListing(params.id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken()}`,
        },
        body: JSON.stringify(listingFormData()),
      })
      navigate(routes.myListings)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    if (props.page === "new") navigate(routes.profile)
    if (props.page === "edit") navigate(routes.myListings)
  }

  return (
    <div class="listing-form">
      <Form
        of={listingForm}
        class="listing-form__form"
        onSubmit={handleFormSubmission}>
        <Field
          of={listingForm}
          name="title"
          validate={[required("please provide a title")]}>
          {field => (
            <>
              <input
                {...field.props}
                class="listing-form__input"
                type="text"
                placeholder="title"
                value={props.listingDetails.title}
                onchange={event =>
                  handleFormInput(event, setListingFormData, setServerError)
                }
                required
              />
              {field.error && <p class="listing-form__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          of={listingForm}
          name="price"
          validate={[required("please provide a price")]}>
          {field => (
            <>
              <input
                {...field.props}
                class="listing-form__input"
                type="number"
                placeholder="price"
                min="1"
                value={props.listingDetails.price}
                onchange={event =>
                  handleFormInput(event, setListingFormData, setServerError)
                }
                required
              />
              {field.error && <p class="listing-form__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          of={listingForm}
          name="description"
          validate={[required("please provide a description")]}>
          {field => (
            <>
              <textarea
                {...field.props}
                class="listing-form__input"
                placeholder="description"
                value={props.listingDetails.description}
                onchange={event =>
                  handleFormInput(event, setListingFormData, setServerError)
                }
                required
                cols="30"
                rows="10"></textarea>
              {field.error && <p class="listing-form__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          of={listingForm}
          name="location"
          validate={[required("please provide a location")]}>
          {field => (
            <>
              <input
                {...field.props}
                class="listing-form__input"
                type="text"
                placeholder="location"
                value={props.listingDetails.location}
                onchange={event =>
                  handleFormInput(event, setListingFormData, setServerError)
                }
                required
              />
              {field.error && <p class="listing-form__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          of={listingForm}
          name="phone"
          validate={[required("please provide a contact number")]}>
          {field => (
            <>
              <input
                {...field.props}
                class="listing-form__input"
                type="tel"
                placeholder="contact number"
                value={props.listingDetails.phone}
                onchange={event =>
                  handleFormInput(event, setListingFormData, setServerError)
                }
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
                  navigate(`${routes.manageImages}/${props.listingId}`)
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
