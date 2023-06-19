import { Component } from "solid-js"
import "./LoadingSpinner.scss"

const LoadingSpinner: Component = () => (
  <div class="loading-spinner">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
)

export default LoadingSpinner
