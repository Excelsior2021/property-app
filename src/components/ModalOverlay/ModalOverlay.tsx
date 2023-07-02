import { Component } from "solid-js"
import { disableModal } from "../../utils/utils"
import "./ModalOverlay.scss"

interface modalOverlayProps {
  data: {
    message: string
    buttonText: string
    buttonHandler: () => void
  }
}

const ModalOverlay: Component<modalOverlayProps> = props => {
  return (
    <div class="modal-overlay">
      <div class="modal-overlay__message-container">
        <p class="modal-overlay__message">{props.data.message}</p>
      </div>
      <div class="modal-overlay__actions">
        {props.data.buttonText && (
          <button
            class="modal-overlay__button modal-overlay__button--action"
            onclick={props.data.buttonHandler}>
            {props.data.buttonText}
          </button>
        )}
        <button
          class="modal-overlay__button modal-overlay__button--close"
          onclick={disableModal}>
          close
        </button>
      </div>
    </div>
  )
}

export default ModalOverlay
