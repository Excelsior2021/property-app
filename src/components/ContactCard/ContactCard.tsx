import { Component } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { loggedIn, setModal, setModalOverlayData } from "../../store/store"
import routes from "../../utils/client-routes"
import "./ContactCard.scss"

interface contactCardProps {
  phone: string
  email: string
}

const ContactButton = () => {
  const navigate = useNavigate()
  return (
    <div class="contact-button">
      <button
        class="contact-button__button contact-button__button--contact"
        onclick={() => {
          setModal(true)
          setModalOverlayData({
            message: "Please log in to see contact details",
            buttonText: "log in",
            buttonHandler: () => navigate(routes.login),
          })
        }}>
        show contact details
      </button>
    </div>
  )
}

const ContactCard: Component<contactCardProps> = props => {
  return (
    <div class="contact-card">
      <div
        class={
          loggedIn()
            ? "contact-card__details"
            : "contact-card__details contact-card__details--hide"
        }>
        <img
          class="contact-card__img"
          src="/public/icons/profile-pic.svg"
          alt="profile picture"
        />
        <p class="contact-card__label">contact number</p>
        <p class="contact-card__value">{props.phone}</p>
        <p class="contact-card__label">email</p>
        <p class="contact-card__value">{props.email}</p>
      </div>
      {!loggedIn() && <ContactButton />}
    </div>
  )
}

export default ContactCard
