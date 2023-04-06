import { Component } from "solid-js"
import { A } from "@solidjs/router"
import { createForm, Field, Form, required, email } from "@modular-forms/solid"
import "./Login.scss"

type LoginForm = {
  email: string
  password: string
}

const Login: Component = () => {
  const loginForm = createForm<LoginForm>()

  const handleSubmit = () => {
    console.log("hello world")
  }

  return (
    <div class="login">
      <p class="login__text">
        Please log in. Don't have an account? Click the register button below.
      </p>
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
                type="passowrd"
                placeholder="password"
                required
              />
              {field.error && <p class="login__error">{field.error}</p>}
            </>
          )}
        </Field>
        <button class="login__button login__button--login">log in</button>
      </Form>

      <p class="login__text">
        Don't have an account? <A href="/register">Register here</A>
      </p>
    </div>
  )
}

export default Login
