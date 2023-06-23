import { handleFormInputType } from "../types/general"
import { setErrorMessage, setLoggedIn } from "../store/store"
import routes from "./client-routes"

export const handleFormInput: handleFormInputType = (event, setFormData) => {
  setErrorMessage("")
  setFormData(prevState => ({
    ...prevState,
    [event.currentTarget.name]: event.currentTarget.value,
  }))
}

export const handleServerError = res => {
  localStorage.removeItem("accessToken")
  setLoggedIn(false)
  if (res) {
    switch (res.status) {
      case 400:
        setErrorMessage(
          "Email and/or password incorrect. Please check and try again."
        )
        break
      case 401:
        setErrorMessage(
          "You are unauthorized to view that page or execute that action. Please log in again."
        )
        return { route: routes.login }
      case 404:
        setErrorMessage("Resource not found.")
        break
      case 409:
        setErrorMessage("Email address already registered.")
        throw new Error()
      default:
        setErrorMessage("Oops. An error occured.")
        throw new Error()
    }
  } else {
    setErrorMessage("There was a server error. Please try again later.")
    throw new Error()
  }
}
