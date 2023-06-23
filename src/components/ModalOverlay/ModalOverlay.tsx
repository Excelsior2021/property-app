import { Component } from "solid-js"
import { disableModal } from "../../utils/utils"
import { useNavigate } from "@solidjs/router"
import routes from "../../utils/client-routes"
import "./ModalOverlay.scss"

interface modalOverlayProps {
  data: {
    message: string
    buttonText: string
  }
}

const ModalOverlay: Component<modalOverlayProps> = props => {
  const navigate = useNavigate()
  return (
    <div class="modal-overlay">
      <div class="modal-overlay__message-container">
        <p class="modal-overlay__message">{props.data.message}</p>
      </div>
      <div class="modal-overlay__actions">
        {props.data.buttonText && (
          <button
            class="modal-overlay__button modal-overlay__button--action"
            onclick={() => navigate(routes.login)}>
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
