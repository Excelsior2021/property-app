import { Component, createSignal } from "solid-js"
import { handleVerifySendEmail } from "../../api/api"
import "./PleaseVerify.scss"
import { errorMessage } from "../../store/store"

const PleaseVerify: Component = props => {
  const [emailSent, setEmailSent] = createSignal(false)

  return (
    <div class="please-verify">
      <p class="please-verify__text">
        In order to proceed with this action, your email address needs to be
        verified.
      </p>
      <button
        class="please-verify__button"
        onclick={async () =>
          setEmailSent(await handleVerifySendEmail(props.user().email))
        }
        disabled={emailSent()}>
        {emailSent() ? "email sent" : "verify email address"}
      </button>
      {errorMessage() && errorMessage()}
    </div>
  )
}
export default PleaseVerify
