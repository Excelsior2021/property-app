import { Component } from "solid-js"
import { createForm, Field, Form } from "@modular-forms/solid"
import "./UploadImages.scss"

type uploadImagesForm = {
  upload: File
}

const uploadImages: Component = () => {
  const uploadImagesForm = createForm<uploadImagesForm>()
  let fileRef

  const handleUpload = () => uploadImages(fileRef.files)

  const uploadImages = async files => {
    const formData = new FormData()

    for (const file of files) {
      formData.append("images", file)
    }

    try {
      await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization:
            "Bearear eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODQzNTY5MjksImlhdCI6MTY4NDM1NTEyOSwKICAgICJpZCIgOiAiOWZiMmY4NmItMjE2ZC00OWRkLThlMWUtNzk0Y2E4MTQzMTE2IiwKICAgICJuYW1lIiA6ICJjaHJpcyIsCiAgICAiZW1haWwiIDogImNocmlzIiwKICAgICJwYXNzd29yZCIgOiAiJDJhJDEyJFJrQlJKaDhnVDRBcFNBUHhLRnpZTHVsSXltWTN6dXlFSUdHTldYQlBxMC5abTYwVlVERHp1Igp9.GaFEQQ0HfzDafw_5Gu2Mzr2X1QbE1hLUKTTFH4mbUKiCRMC_FoHE4mBLCcUUS2zAXcHeOLOF0x1KbiN9_ien3Q",
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div class="upload-images">
      <h2>Upload Images</h2>
      <Form
        of={uploadImagesForm}
        class="upload-images__form"
        onSubmit={handleUpload}>
        <Field of={uploadImagesForm} name="upload">
          {field => (
            <input
              {...field.props}
              id="upload"
              class="upload-images__input"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              multiple
              ref={fileRef}
            />
          )}
        </Field>
        <button class="upload-images__submit">submit</button>
      </Form>
    </div>
  )
}

export default uploadImages
