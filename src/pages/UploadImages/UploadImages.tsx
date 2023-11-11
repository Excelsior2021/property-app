import { Component } from "solid-js"
import ManageImages from "../../components/ManageImages/ManageImages"
import "./UploadImages.scss"
import headings from "../../utils/page-headings"

const UploadImages: Component = () => {
  return (
    <div class="upload-images">
      <ManageImages page="new" heading={headings.manageImages} />
    </div>
  )
}

export default UploadImages
