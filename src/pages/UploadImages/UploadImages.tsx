import { Component } from "solid-js"
import ManageImages from "../../components/ManageImages/ManageImages"
import "./UploadImages.scss"

const UploadImages: Component = () => {
  return (
    <div class="upload-images">
      <ManageImages page="new" heading="upload images" />
    </div>
  )
}

export default UploadImages
