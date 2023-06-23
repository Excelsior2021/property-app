import { Component, Resource, Show, JSX } from "solid-js"
import "./ServerError.scss"

interface serverErrorProps {
  data: Resource<any>
  children: JSX.Element
  error: string
}

const ServerError: Component<serverErrorProps> = props => {
  return (
    <div class="server-error">
      <Show
        when={!props.data.error}
        fallback={<p class="server-error__message">{props.error}</p>}>
        {props.children}
      </Show>
    </div>
  )
}

export default ServerError
