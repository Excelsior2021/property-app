import { Component, createSignal } from "solid-js"
import { A, useNavigate } from "@solidjs/router"
import {
  createForm,
  Field,
  Form,
  required,
  email,
  custom,
} from "@modular-forms/solid"
import {
  setLoggedIn,
  setUserData,
  accessToken,
  setAccessToken,
} from "../../store/store"
import { handleFormInput } from "../../utils/utils"
import { login, profile, signup } from "../../api/api-endpoints"
import routes from "../../utils/client-routes"
import "./Signup.scss"

type signupForm = {
  name: string
  email: string
  password: string
  retypePassword: string
}

const Signup: Component = () => {
  const signupForm = createForm<signupForm>()
  const [signupFormData, setSignupFormData] = createSignal({
    name: "",
    email: "",
    password: "",
  })
  const [retypePassword, setRetypePassword] = createSignal("")
  const [serverError, setServerError] = createSignal(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    console.log(signupFormData())

    try {
      const res = await fetch(signup, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupFormData()),
      })

      switch (res.status) {
        case 201:
          const res = await fetch(login, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signupFormData()),
          })

          const data = await res.json()
          localStorage.setItem("accessToken", data.accessToken)
          setAccessToken(data.accessToken)

          const userDataRes = await fetch(profile, {
            headers: {
              Authorization: `Bearer ${accessToken()}`,
            },
          })

          const userData = await userDataRes.json()

          setLoggedIn(true)
          setUserData(userData)

          navigate(routes.profile)
          break
        case 409:
          setServerError(true)
          break
        default:
          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div class="signup">
      <h1 class="page__heading">Signup</h1>
      <Form of={signupForm} class="signup__form" onSubmit={handleSubmit}>
        <Field
          of={signupForm}
          name="name"
          validate={[required("a full name is required.")]}>
          {field => (
            <>
              <input
                {...field.props}
                class="signup__input"
                type="text"
                placeholder="name"
                onchange={event =>
                  handleFormInput(event, setSignupFormData, setServerError)
                }
                required
              />
              {field.error && <p class="signup__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          of={signupForm}
          name="email"
          validate={[
            required("an email is required."),
            email("please enter a valid email address"),
          ]}>
          {field => (
            <>
              <input
                {...field.props}
                class="signup__input"
                type="email"
                placeholder="email"
                onchange={event =>
                  handleFormInput(event, setSignupFormData, setServerError)
                }
                required
              />
              {field.error && <p class="signup__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          of={signupForm}
          name="password"
          validate={[required("a password is required.")]}>
          {field => (
            <>
              <input
                {...field.props}
                class="signup__input"
                type="password"
                placeholder="password"
                onchange={event =>
                  handleFormInput(event, setSignupFormData, setServerError)
                }
                required
              />
              {field.error && <p class="signup__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          of={signupForm}
          name="retypePassword"
          validate={[
            custom(
              () => signupFormData().password === retypePassword(),
              "passwords do not match."
            ),
            required("please retype your password."),
          ]}>
          {field => (
            <>
              <input
                {...field.props}
                class="signup__input"
                type="password"
                placeholder="retype password"
                onchange={event => setRetypePassword(event.currentTarget.value)}
                required
              />
              {field.error && <p class="signup__error">{field.error}</p>}
            </>
          )}
        </Field>
        <button class="signup__button">sign up</button>
      </Form>

      <div class="signup__server-errors">
        {serverError() && (
          <p class="signup__server-error signup__error">
            Email address already registered.
          </p>
        )}
      </div>

      <p class="signup__text">
        Already have an account? <A href="/login">Log in here</A>
      </p>
    </div>
  )
}

export default Signup
