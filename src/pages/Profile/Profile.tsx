import { Component, createEffect } from "solid-js"
import { A, useNavigate } from "@solidjs/router"
import {
  accessToken,
  loggedIn,
  setLoggedIn,
  setUserData,
} from "../../store/store"
import { userData } from "../../store/store"
import { profile } from "../../api/api-endpoints"
import "./Profile.scss"

const Profile: Component = () => {
  const navigate = useNavigate()

  createEffect(async () => {
    const res = await fetch(profile, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    })

    const data = await res.json()
    setUserData(prev => ({
      ...prev,
      name: data.name,
    }))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    setLoggedIn(false)
    navigate("/")
  }

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
        <button class="profile__button" onclick={handleLogout}>
          logout
        </button>
      </div>
    )
  } else {
    return <p>Please login to view your profile.</p>
  }
}

export default Profile
