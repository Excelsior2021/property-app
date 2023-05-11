import { Component, createSignal } from "solid-js"
import { A, useNavigate } from "@solidjs/router"
import { createForm, Field, Form, required, email } from "@modular-forms/solid"
import "./Register.scss"
import { setLoggedIn, setUserData } from "../../store/store"

type registerForm = {
  name: string
  email: string
  password: string
}

const Register: Component = () => {
  const registerForm = createForm<registerForm>()
  const [registerFormData, setRegisterFormData] = createSignal({
    name: "",
    email: "",
    password: "",
  })
  const [accessToken, setAccessToken] = createSignal(null)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    console.log(registerFormData())

    try {
      const res = await fetch("http://localhost:8080/api/auth/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerFormData()),
      })

      if (res.status === 201) {
        const res = await fetch("http://localhost:8080/api/auth/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerFormData()),
        })

        const data = await res.json()
        setAccessToken(data.accessToken)

        const userDataRes = await fetch("http://localhost:8080/profile", {
          headers: {
            Authorization: `Bearer ${accessToken()}`,
          },
        })

        const userData = await userDataRes.json()

        setLoggedIn(true)
        setUserData(userData)

        navigate("/profile")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleInput = event => {
    setRegisterFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <div class="register">
      <h1 class="page__heading">Register</h1>
      <p class="register__text">Register for an account here.</p>
      <Form of={registerForm} class="register__form" onSubmit={handleSubmit}>
        <Field
          of={registerForm}
          name="name"
          validate={[required("a full name is required.")]}>
          {field => (
            <>
              <input
                {...field.props}
                class="register__input"
                type="text"
                placeholder="name"
                onchange={handleInput}
                required
              />
              {field.error && <p class="register__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          of={registerForm}
          name="email"
          validate={[
            required("an email is required."),
            email("please enter a valid email address"),
          ]}>
          {field => (
            <>
              <input
                {...field.props}
                class="register__input"
                type="email"
                placeholder="email"
                onchange={handleInput}
                required
              />
              {field.error && <p class="register__error">{field.error}</p>}
            </>
          )}
        </Field>
        <Field
          of={registerForm}
          name="password"
          validate={[required("a password is required.")]}>
          {field => (
            <>
              <input
                {...field.props}
                class="register__input"
                type="password"
                placeholder="password"
                onchange={handleInput}
                required
              />
              {field.error && <p class="register__error">{field.error}</p>}
            </>
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
