import { Component, createSignal, Switch, Match } from "solid-js"
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
  heading: string
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

  if (props.page === "edit" && !listingFormData().id) {
    for (const property in initialListingFormData) {
      setListingFormData(prevState => ({
        ...prevState,
        [property]: props.listing[property],
      }))
    }
  }

  const handleFormSubmission = () => {
    if (props.page === "new") navigate(routes.uploadImages)
    if (props.page === "edit")
      navigate(`${routes.manageImages}/${props.listing.id}`)
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
        <h2 class="listing-form__heading">{props.heading}</h2>
        <Field name="title" validate={[required("please provide a title")]}>
          {(field, fieldProps) => (
            <>
              <input
                {...fieldProps}
                class="listing-form__input"
                type="text"
                placeholder="title"
                value={listingFormData().title}
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
                min="0"
                value={listingFormData().price}
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
                value={listingFormData().description}
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
                value={listingFormData().location}
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
                value={listingFormData().phone}
                onchange={event => handleFormInput(event, setListingFormData)}
                required
              />
              {field.error && <p class="listing-form__error">{field.error}</p>}
            </>
          )}
        </Field>
        <div class="listing-form__actions">
          <div class={subActionsClass}>
            <Switch>
              <Match when={props.page === "new"}>
                <button class="listing-form__button">upload images</button>
              </Match>
              <Match when={props.page === "edit"}>
                <button class="listing-form__button listing-form__button--manage">
                  manage images
                </button>
              </Match>
            </Switch>
            <CancelButton
              handleCancel={handleCancel}
              styles={cancelButtonClass}
            />
          </div>
        </div>
      </Form>
    </div>
  )
}

export default ListingForm
