import { Component } from "solid-js"
import { A } from "@solidjs/router"
import { createForm, Field, Form } from "@modular-forms/solid"
import "./Register.scss"

type registerForm = {
  firstName: string
  lastName: string
  dob: string
  email: string
  password: string
  confirmPassword: string
}

const Register: Component = () => {
  const registerForm = createForm<registerForm>()
  return (
    <div class="register">
      <p class="register__text">Register for an account here.</p>
      <Form of={registerForm} class="register__form">
        <Field of={registerForm} name="firstName">
          {field => (
            <input
              {...field.props}
              class="register__input"
              type="text"
              placeholder="first name"
            />
          )}
        </Field>
        <Field of={registerForm} name="lastName">
          {field => (
            <input
              {...field.props}
              class="register__input"
              type="text"
              placeholder="last name"
            />
          )}
        </Field>
        <Field of={registerForm} name="dob">
          {field => (
            <input
              {...field.props}
              class="register__input"
              type="date"
              placeholder="date of birth"
            />
          )}
        </Field>
        <Field of={registerForm} name="email">
          {field => (
            <input
              {...field.props}
              class="register__input"
              type="email"
              placeholder="email"
            />
          )}
        </Field>
        <Field of={registerForm} name="password">
          {field => (
            <input
              {...field.props}
              class="register__input"
              type="passowrd"
              placeholder="password"
            />
          )}
        </Field>
        <Field of={registerForm} name="confirmPassword">
          {field => (
            <input
              {...field.props}
              class="register__input"
              type="passowrd"
              placeholder="confirm password"
            />
          )}
        </Field>
        <button class="login__button login__button--register">register</button>
      </Form>

      <p class="login__text">
        Already have an account? <A href="/login">Log in here</A>
      </p>
    </div>
  )
}

export default Register
