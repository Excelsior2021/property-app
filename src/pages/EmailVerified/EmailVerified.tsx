import { Match, Show, Switch, createEffect, createResource } from "solid-js"
import { A, useSearchParams } from "@solidjs/router"
import routes from "../../utils/client-routes"
import ServerError from "../../components/ServerError/ServerError"
import { handleVerifyEmail } from "../../api/api"
import { errorMessage } from "../../store/store"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { logout } from "../../utils/utils"
import "./EmailVerified.scss"

const EmailVerified = () => {
  const [searchParams] = useSearchParams()
  const [verify] = createResource(() => handleVerifyEmail(searchParams.token))

  createEffect(() => {
    if (verify() === 200) logout()
  })

  return (
    <div class="email-verified">
      <ServerError error={errorMessage()}>
        <Show when={!verify.loading} fallback={<LoadingSpinner />}>
          <Switch>
            <Match when={verify() === 200}>
              <p>
                Your email address has been verified. Please{" "}
                <A href={routes.login}>log in</A>.
              </p>
            </Match>
            <Match when={verify() === 400}>
              <p>
                Your verification token has expired. Please verify your email
                address again.
              </p>
            </Match>
          </Switch>
        </Show>
      </ServerError>
    </div>
  )
}

export default EmailVerified
