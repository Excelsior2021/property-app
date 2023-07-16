import { Component, Show, createResource, createSignal } from "solid-js"
import { A, useNavigate } from "@solidjs/router"
import { createForm, required, email } from "@modular-forms/solid"
import {
  setLoggedIn,
  accessToken,
  setAccessToken,
  errorMessage,
} from "../../store/store"
import { handleFormInput, handleServerError } from "../../utils/utils"
import { login } from "../../api/api-endpoints"
import { fetchSavedListingsIds } from "../../api/api"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import "./Login.scss"

type LoginForm = {
  email: string
  password: string
}

const Login: Component = () => {
  const [loginForm, { Field, Form }] = createForm<LoginForm>()
  const [loginFormData, setLoginFormData] = createSignal({
    email: "",
    password: "",
  })
  const [submitted, setSubmitted] = createSignal(0)
  const naviagte = useNavigate()

  const handleSubmit = async () => {
    if (submitted()) {
      let res
      try {
        res = await fetch(login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken()}`,
          },
          body: JSON.stringify(loginFormData()),
        })

        if (res.status === 200) {
          const data = await res.json()
          localStorage.setItem("accessToken", data.accessToken)
          setAccessToken(data.accessToken)
          setLoggedIn(true)
          naviagte("/profile")
          fetchSavedListingsIds()
        } else throw new Error()
      } catch (error) {
        handleServerError(res)
      }
    }
  }

  const [loggingIn] = createResource(submitted, handleSubmit)

  return (
    <div class="login">
      <Show when={!loggingIn.loading} fallback={<LoadingSpinner />}>
        <h2 class="login__heading">log in</h2>
        <Form
          class="login__form"
          onSubmit={() => {
            setSubmitted(prev => prev + 1)
            handleSubmit()
          }}>
          <Field
            name="email"
            validate={[
              required("please enter your email."),
              email("please enter a valid email address"),
            ]}>
            {(field, props) => (
              <>
                <input
                  {...props}
                  class="login__input"
                  type="email"
                  placeholder="email"
                  onchange={event => handleFormInput(event, setLoginFormData)}
                  required
                />
                {field.error && <p class="login__error">{field.error}</p>}
              </>
            )}
          </Field>
          <Field
            name="password"
            validate={[required("please enter your password.")]}>
            {(field, props) => (
              <>
                <input
                  {...props}
                  class="login__input"
                  type="password"
                  placeholder="password"
                  onchange={event => handleFormInput(event, setLoginFormData)}
                  required
                />
                {field.error && <p class="login__error">{field.error}</p>}
              </>
            )}
          </Field>
          <button class="login__button login__button--login">log in</button>
        </Form>

        <p class="login__error login__error--form">
          {errorMessage() && errorMessage()}
        </p>

        <p class="login__text">
          Don't have an account?{" "}
          <A class="login__link" href="/sign-up">
            Sign up here
          </A>
        </p>
      </Show>
    </div>
  )
}

export default Login
