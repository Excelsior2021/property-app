import { Component, createResource, Show } from "solid-js"
import { A, useNavigate } from "@solidjs/router"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { errorMessage, loggedIn } from "../../store/store"
import {
  initialListingFormData,
  setListingFormData,
} from "../../components/ListingForm/ListingForm"
import routes from "../../utils/client-routes"
import ServerError from "../../components/ServerError/ServerError"
import { logout } from "../../utils/utils"
import "./Profile.scss"
import { fetchProfile } from "../../api/api"

const Profile: Component = () => {
  const navigate = useNavigate()
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
              Hello {profileResource().name ? profileResource().name : "user"},
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
