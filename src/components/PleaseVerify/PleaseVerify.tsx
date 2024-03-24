import { Component, createResource, createSignal, Show } from "solid-js"
import { handleVerifySendEmail } from "../../api/api"
import { errorMessage } from "../../store/store"
import "./PleaseVerify.scss"

const PleaseVerify: Component = props => {
  const [sendEmail, setSendEmail] = createSignal(false)
  const [emailSent, setEmailSent] = createSignal(false)

  const sendVerificationEmail = async () => {
    const res = await handleVerifySendEmail(props.user().email)
    setEmailSent(res)
    return res
  }

  const [email] = createResource(sendEmail, sendVerificationEmail)

  return (
    <div class="please-verify">
      <p class="please-verify__text">
        In order to proceed with this action, your email address needs to be
        verified.
      </p>
      <button
        class="please-verify__button"
        onclick={() => setSendEmail(true)}
        disabled={emailSent()}>
        <Show when={sendEmail()} fallback="verify email address">
          <Show when={!email.loading} fallback="please wait...">
            <Show when={email()} fallback="error occured">
              {"email sent"}
            </Show>
          </Show>
        </Show>
      </button>
      {errorMessage() && errorMessage()}
    </div>
  )
}
export default PleaseVerify
