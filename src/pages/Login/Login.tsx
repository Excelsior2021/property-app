import { Component, createSignal } from "solid-js"
import { A, useNavigate } from "@solidjs/router"
import { createForm, Field, Form, required, email } from "@modular-forms/solid"
import { setLoggedIn, accessToken, setAccessToken } from "../../store/store"
import { handleFormInput } from "../../utils/utils"
import { login } from "../../api/api-endpoints"
import "./Login.scss"
import { fetchSavedListingsIds } from "../../api/api"

type LoginForm = {
  email: string
  password: string
}

const Login: Component = () => {
  const loginForm = createForm<LoginForm>()
  const [loginFormData, setLoginFormData] = createSignal({
    email: "",
    password: "",
  })
  const [serverError, setServerError] = createSignal(false)
  const naviagte = useNavigate()

  const handleSubmit = async () => {
    try {
      const res = await fetch(login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken()}`,
        },
        body: JSON.stringify(loginFormData()),
      })

      switch (res.status) {
        case 200:
          const data = await res.json()
          localStorage.setItem("accessToken", data.accessToken)
          setAccessToken(data.accessToken)
          setLoggedIn(true)
          naviagte("/profile")
          fetchSavedListingsIds()
          break
        case 400:
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
    <div class="login">
      <h1 class="page__heading">Log in</h1>

      <Form of={loginForm} class="login__form" onSubmit={handleSubmit}>
        <Field
          of={loginForm}
          name="email"
          validate={[
            required("please enter your email."),
            email("please enter a valid email address"),
          ]}>
          {field => (
            <>
              <input
                {...field.props}
                class="login__input"
                type="email"
                placeholder="email"
                onchange={event =>
                  handleFormInput(event, setLoginFormData, setServerError)
                }
                required
              />
              {field.error && <p class="login__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          of={loginForm}
          name="password"
          validate={[required("please enter your password.")]}>
          {field => (
            <>
              <input
                {...field.props}
                class="login__input"
                type="password"
                placeholder="password"
                onchange={event =>
                  handleFormInput(event, setLoginFormData, setServerError)
                }
                required
              />
              {field.error && <p class="login__error">{field.error}</p>}
            </>
          )}
        </Field>
        <button class="login__button login__button--login">log in</button>
      </Form>

      <div class="login__server-errors">
        {serverError() && (
          <p class="login__server-error login__error">
            Email or password incorrect. Please check and try again.
          </p>
        )}
      </div>

      <p class="login__text">
        Don't have an account? <A href="/sign-up">Sign up here</A>
      </p>
    </div>
  )
}

export default Login
