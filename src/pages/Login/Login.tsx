import { Component } from "solid-js"
import { A } from "@solidjs/router"
import { createForm, Field, Form } from "@modular-forms/solid"
import "./Login.scss"

type LoginForm = {
  email: string
  password: string
}

const Login: Component = () => {
  const loginForm = createForm<LoginForm>()

  return (
    <div class="login">
      <p class="login__text">
        Please log in. Don't have an account? Click the register button below.
      </p>
      <Form of={loginForm} class="login__form">
        <Field of={loginForm} name="email">
          {field => (
            <input
              {...field.props}
              class="login__input"
              type="email"
              placeholder="email"
            />
          )}
        </Field>
        <Field of={loginForm} name="password">
          {field => (
            <input
              {...field.props}
              class="login__input"
              type="passowrd"
              placeholder="password"
            />
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
