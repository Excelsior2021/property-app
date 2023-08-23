import { Component, createSignal, createResource, Show } from "solid-js"
import { A, useNavigate } from "@solidjs/router"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import {
  accessToken,
  errorMessage,
  loggedIn,
  setUserData,
} from "../../store/store"
import { userData } from "../../store/store"
import { profile } from "../../api/api-endpoints"
import {
  initialListingFormData,
  setListingFormData,
} from "../../components/ListingForm/ListingForm"
import routes from "../../utils/client-routes"
import ServerError from "../../components/ServerError/ServerError"
import { handleServerError, logout } from "../../utils/utils"
import "./Profile.scss"

const Profile: Component = () => {
  const navigate = useNavigate()

  const fetchProfile = async () => {
    let res
    try {
      res = await fetch(profile, {
        headers: {
          Authorization: `Bearer ${accessToken()}`,
        },
      })

      if (res.status === 200) {
        const { name, email } = await res.json()
        setUserData({
          name: name,
          email: email,
        })
        return { name, email }
      }
    } catch (error) {
      handleServerError(res)
    }
  }

  const [profileResource] = createResource(fetchProfile)

  const handleLogout = () => {
    logout()
    navigate(routes.discover)
  }

  const fallback = <p>Please login to view your profile.</p>

  return (
    <div class="profile">
      <Show when={loggedIn()} fallback={fallback}>
        <ServerError data={profileResource} error={errorMessage()}>
          <Show when={!profileResource.loading} fallback={<LoadingSpinner />}>
            <h2 class="profile__greeting">
              Hello {userData().name ? userData().name : "user"},
            </h2>
            <p class="profile__text">What would you like to do?</p>
            <div class="profile__actions">
              <A
                class="profile__link"
                href={routes.newListing}
                onclick={() => setListingFormData(initialListingFormData)}>
                new listing
              </A>
              <A class="profile__link" href={routes.myListings}>
                my listings
              </A>
              <button
                class="profile__button profile__button--logout"
                onclick={handleLogout}>
                logout
              </button>
            </div>
          </Show>
        </ServerError>
      </Show>
    </div>
  )
}

export default Profile
