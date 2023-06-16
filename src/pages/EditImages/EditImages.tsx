import { Component } from "solid-js"
import ManageImages from "../../components/ManageImages/ManageImages"
import "./EditImages.scss"

const EditImages: Component = () => {
  return (
    <div class="edit-images">
      <ManageImages page="edit" />
    </div>
  )
}

export default EditImages
