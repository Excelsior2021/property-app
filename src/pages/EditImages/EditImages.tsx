import { Component } from "solid-js"
import "./EditImages.scss"
import ManageImages from "../../components/ManageImages/ManageImages"

const EditImages: Component = () => {
  return (
    <div class="edit-images">
      <ManageImages page="edit" />
    </div>
  )
}

export default EditImages
