import { Component } from "solid-js"
import "./CancelButton.scss"

interface cancelButtonProps {
  handleCancel: () => void
  styles: string
}

const CancelButton: Component<cancelButtonProps> = props => (
  <button class={`cancel-button ${props.styles}`} onclick={props.handleCancel}>
    cancel
  </button>
)

export default CancelButton
