import { Component, createEffect } from "solid-js"
import { A } from "@solidjs/router"
import { accessToken, loggedIn, setUserData } from "../../store/store"
import { userData } from "../../store/store"
import { profile } from "../../api/api-endpoints"
import "./Profile.scss"

const Profile: Component = () => {
  createEffect(async () => {
    const res = await fetch(profile, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    })

    const data = await res.json()
    console.log(data)
    setUserData(prev => ({
      ...prev,
      name: data.name,
    }))
  }, [])

  if (loggedIn()) {
    return (
      <div class="profile">
        <h2 class="profile__greeting">
          Hello {userData().name ? userData().name : "user"},
        </h2>
        <p class="profile__text">What would you like to do?</p>

        <A class="profile__link" href="/new-listing">
          new listing
        </A>
        <A class="profile__link" href="/my-listings">
          my listings
        </A>
      </div>
    )
  }
}

export default Profile
