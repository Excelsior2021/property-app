import { Component, createResource, createSignal, Show } from "solid-js"
import { A, useNavigate } from "@solidjs/router"
import { createForm, required, email, custom } from "@modular-forms/solid"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import {
  setLoggedIn,
  accessToken,
  setAccessToken,
  errorMessage,
} from "../../store/store"
import { handleFormInput, handleServerError } from "../../utils/utils"
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
  const [signupForm, { Field, Form }] = createForm<signupForm>()
  const [signupFormData, setSignupFormData] = createSignal({
    name: "",
    email: "",
    password: "",
  })
  const [retypePassword, setRetypePassword] = createSignal("")
  const [submitted, setSubmitted] = createSignal(0)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    let res
    if (submitted()) {
      try {
        res = await fetch(signup, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupFormData()),
        })

        if (res.status === 201) {
          let res
          try {
            res = await fetch(login, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(signupFormData()),
            })

            if (res.status === 200) {
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
              navigate(routes.account)
            } else throw new Error()
          } catch (error) {
            handleServerError(res)
          }
        } else throw new Error()
      } catch (error) {
        handleServerError(res)
      }
    }
  }

  const [signedUp] = createResource(submitted, handleSubmit)

  return (
    <div class="signup">
      <Show when={!signedUp.loading} fallback={<LoadingSpinner />}>
        <h2 class="signup__heading">sign up</h2>
        <Form
          class="signup__form"
          onSubmit={() => {
            setSubmitted(prev => prev + 1)
          }}>
          <Field name="name" validate={[required("a full name is required.")]}>
            {(field, props) => (
              <>
                <input
                  {...props}
                  class="signup__input"
                  type="text"
                  placeholder="name"
                  onChange={event => handleFormInput(event, setSignupFormData)}
                  required
                />
                {field.error && <p class="signup__error">{field.error}</p>}
              </>
            )}
          </Field>
          <Field
            name="email"
            validate={[
              required("an email is required."),
              email("please enter a valid email address"),
            ]}>
            {(field, props) => (
              <>
                <input
                  {...props}
                  class="signup__input"
                  type="email"
                  placeholder="email"
                  onChange={event => handleFormInput(event, setSignupFormData)}
                  required
                />
                {field.error && <p class="signup__error">{field.error}</p>}
              </>
            )}
          </Field>
          <Field
            name="password"
            validate={[required("a password is required.")]}>
            {(field, props) => (
              <>
                <input
                  {...props}
                  class="signup__input"
                  type="password"
                  placeholder="password"
                  onChange={event => handleFormInput(event, setSignupFormData)}
                  required
                />
                {field.error && <p class="signup__error">{field.error}</p>}
              </>
            )}
          </Field>
          <Field
            name="retypePassword"
            validate={[
              custom(
                () => signupFormData().password === retypePassword(),
                "passwords do not match."
              ),
              required("please retype your password."),
            ]}>
            {(field, props) => (
              <>
                <input
                  {...props}
                  class="signup__input"
                  type="password"
                  placeholder="retype password"
                  onChange={event =>
                    setRetypePassword(event.currentTarget.value)
                  }
                  required
                />
                {field.error && <p class="signup__error">{field.error}</p>}
              </>
            )}
          </Field>
          <button class="signup__button">sign up</button>
        </Form>

        <div class="signup__error signup__error--form">
          {errorMessage() && errorMessage()}
        </div>

        <p class="signup__text">
          Already have an account?{" "}
          <A class="signup__link" href={routes.login}>
            Log in here
          </A>
        </p>
      </Show>
    </div>
  )
}

export default Signup
