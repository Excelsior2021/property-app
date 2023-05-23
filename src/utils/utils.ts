export const handleFormInput = (event, setter) => {
  setter(prevState => ({
    ...prevState,
    [event.target.name]: event.target.value,
  }))
}
