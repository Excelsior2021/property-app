import { Component } from "solid-js"
import ManageImages from "../../components/ManageImages/ManageImages"
import "./EditImages.scss"
import headings from "../../utils/page-headings"

const EditImages: Component = () => {
  return (
    <div class="edit-images">
      <ManageImages page="edit" heading={headings.manageImages} />
    </div>
  )
}

export default EditImages
