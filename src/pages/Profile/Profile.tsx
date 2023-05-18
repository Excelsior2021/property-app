import { Component } from "solid-js"
import { A } from "@solidjs/router"
import { loggedIn } from "../../store/store"
import { userData } from "../../store/store"
import "./Profile.scss"

const Profile: Component = () => {
  if (loggedIn()) {
    return (
      <div class="profile">
        {/* <img
          class="profile__image"
          src="./icons/account.svg"
          alt="profile image"
        /> */}
        <h2 class="profile__greeting">
          Hello {userData() ? userData().name : "john"},
        </h2>
        <p class="profile__text">What would you like to do?</p>

        <A class="profile__link" href="../upload-images">
          upload images
        </A>
      </div>
    )
  }
}

export default Profile
