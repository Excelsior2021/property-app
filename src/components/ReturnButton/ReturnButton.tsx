import { Component } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { previousPage } from "../../store/store"
import "./ReturnButton.scss"

const ReturnButton: Component = () => {
  const navigate = useNavigate()
  const handleReturn = () => navigate(previousPage())
  return (
    <button class="return-button" onclick={handleReturn}>
      🠔 Go back
    </button>
  )
}

export default ReturnButton
