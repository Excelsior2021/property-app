import { Component, createSignal } from "solid-js"
import { createForm, Field, Form, required } from "@modular-forms/solid"
import { useNavigate } from "@solidjs/router"
import { accessToken } from "../../store/store"
import { handleFormInput } from "../../utils/utils"
import "./NewListing.scss"

type newListingForm = {
  title: string
  description: string
  price: number
  location: string
  phone: number
}

export const initialNewListingFormData = {
  title: "",
  description: "",
  price: undefined,
  location: "",
  phone: undefined,
}

export const [newListingFormData, setNewListingData] = createSignal(
  initialNewListingFormData
)

const NewListing: Component = () => {
  const newListingForm = createForm<newListingForm>()

  const naviagte = useNavigate()

  const handleSubmit = async () => {
    naviagte("/upload-images")
  }

  return (
    <div class="new-listing">
      <h1 class="page__heading">New Listing</h1>

      <Form
        of={newListingForm}
        class="new-listing__form"
        onSubmit={handleSubmit}>
        <Field
          of={newListingForm}
          name="title"
          validate={[required("please provide a title")]}>
          {field => (
            <>
              <input
                {...field.props}
                class="new-listing__input"
                type="text"
                placeholder="title"
                value={newListingFormData().title}
                onchange={event => handleFormInput(event, setNewListingData)}
                required
              />
              {field.error && <p class="new-listing__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          of={newListingForm}
          name="price"
          validate={[required("please provide a price")]}>
          {field => (
            <>
              <input
                {...field.props}
                class="new-listing__input"
                type="number"
                placeholder="price"
                value={newListingFormData().price}
                onchange={event => handleFormInput(event, setNewListingData)}
                required
              />
              {field.error && <p class="new-listing__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          of={newListingForm}
          name="description"
          validate={[required("please provide a description")]}>
          {field => (
            <>
              <textarea
                {...field.props}
                class="new-listing__input"
                placeholder="description"
                value={newListingFormData().description}
                onchange={event => handleFormInput(event, setNewListingData)}
                required
                cols="30"
                rows="10"></textarea>
              {field.error && <p class="new-listing__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          of={newListingForm}
          name="location"
          validate={[required("please provide a location")]}>
          {field => (
            <>
              <input
                {...field.props}
                class="new-listing__input"
                type="text"
                placeholder="location"
                value={newListingFormData().location}
                onchange={event => handleFormInput(event, setNewListingData)}
                required
              />
              {field.error && <p class="new-listing__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          of={newListingForm}
          name="phone"
          validate={[required("please provide a contact number")]}>
          {field => (
            <>
              <input
                {...field.props}
                class="new-listing__input"
                type="tel"
                placeholder="contact number"
                value={newListingFormData().phone}
                onchange={event => handleFormInput(event, setNewListingData)}
                required
              />
              {field.error && <p class="new-listing__error">{field.error}</p>}
            </>
          )}
        </Field>
        <button class="new-listing__button">next</button>
      </Form>
    </div>
  )
}

export default NewListing
