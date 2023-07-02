import { Component } from "solid-js"
import ModalOverlay from "../ModalOverlay/ModalOverlay"
import { disableModal } from "../../utils/utils"
import "./Modal.scss"

interface modalProps {
  data: {
    message: string
    buttonText: string
    buttonHandler: () => void
  }
}

const Modal: Component<modalProps> = props => {
  const body = document.getElementById("body")
  body.style.overflow = "hidden"

  return (
    <div class="modal" onclick={disableModal}>
      <ModalOverlay data={props.data} />
    </div>
  )
}
export default Modal
