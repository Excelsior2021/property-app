import { Component, createResource, Show } from "solid-js"
import { A, useNavigate } from "@solidjs/router"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import {
  accessToken,
  loggedIn,
  setLoggedIn,
  setUserData,
} from "../../store/store"
import { userData } from "../../store/store"
import { profile } from "../../api/api-endpoints"
import {
  initialListingFormData,
  setListingFormData,
} from "../../components/ListingForm/ListingForm"
import routes from "../../utils/client-routes"
import "./Profile.scss"

const Profile: Component = () => {
  const navigate = useNavigate()

  const fetchProfile = async () => {
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
    return data
  }

  const [profileResource] = createResource(fetchProfile)

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    setLoggedIn(false)
    navigate(routes.discover)
  }

  const fallback = <p>Please login to view your profile.</p>

  return (
    <div class="profile">
      <Show when={loggedIn()} fallback={fallback}>
        <Show when={!profileResource.loading} fallback={<LoadingSpinner />}>
          <h2 class="profile__greeting">
            Hello {userData().name ? userData().name : "user"},
          </h2>
          <p class="profile__text">What would you like to do?</p>
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
        </Show>
      </Show>
    </div>
  )
}

export default Profile
