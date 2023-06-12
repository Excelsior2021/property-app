import { handleFormInputType } from "../types/general"

export const handleFormInput: handleFormInputType = (
  event,
  setFormData,
  setServerError
) => {
  setServerError(false)
  setFormData(prevState => ({
    ...prevState,
    [event.currentTarget.name]: event.currentTarget.value,
  }))
}
