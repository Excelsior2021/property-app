import { Component, ErrorBoundary, JSX } from "solid-js"
import "./ServerError.scss"
import { errorMessage } from "../../store/store"

interface serverErrorProps {
  children: JSX.Element
}

const ServerError: Component<serverErrorProps> = props => (
  <div class="server-error">
    <ErrorBoundary
      fallback={err => (
        <p class="server-error__message">
          {err ? err.message : errorMessage()}
        </p>
      )}>
      {props.children}
    </ErrorBoundary>
  </div>
)

export default ServerError
