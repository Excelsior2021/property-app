import { Component, createSignal } from "solid-js"
import { createForm, Field, Form, required } from "@modular-forms/solid"
import { useNavigate } from "@solidjs/router"
import { handleFormInput } from "../../utils/utils"
import { listingDetailsType } from "../../types/general"
import "./ListingForm.scss"

interface listingFormProps {
  listingDetails: listingDetailsType
}

type listingForm = {
  title: string
  description: string
  price: number
  location: string
  phone: number
}

export const initialListingFormData = {
  title: "",
  description: "",
  price: undefined,
  location: "",
  phone: undefined,
}

export const [listingFormData, setListingFormData] = createSignal(
  initialListingFormData
)

const ListingForm: Component<listingFormProps> = props => {
  const listingForm = createForm<listingForm>()
  const [serverError, setServerError] = createSignal(false)
  const naviagte = useNavigate()

  const handleSubmit = async () => {
    naviagte("/upload-images")
  }

  return (
    <div class="listing-form">
      <Form of={listingForm} class="listing-form__form" onSubmit={handleSubmit}>
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
        <button class="listing-form__button">next</button>
      </Form>
    </div>
  )
}

export default ListingForm
