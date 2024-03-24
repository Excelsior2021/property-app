import { Component, createResource, Show, For } from "solid-js"
import { A, useNavigate } from "@solidjs/router"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { errorMessage } from "../../store/store"
import {
  initialListingFormData,
  setListingFormData,
} from "../../components/ListingForm/ListingForm"
import routes from "../../utils/client-routes"
import ServerError from "../../components/ServerError/ServerError"
import { logout } from "../../utils/utils"
import { fetchUserDetails } from "../../api/api"
import "./Account.scss"

const accountActions = [
  {
    name: "my details",
    route: routes.myDetails,
    onclick: null,
  },
  {
    name: "new listing",
    route: routes.newListing,
    onclick: () => setListingFormData(initialListingFormData),
  },
  {
    name: "my listings",
    route: routes.myListings,
    onclick: null,
  },
]

const Profile: Component = () => {
  const navigate = useNavigate()
  const [profileResource] = createResource(fetchUserDetails)

  const handleLogout = () => {
    logout()
    navigate(routes.discover)
  }

  return (
    <div class="account">
      <ServerError error={errorMessage()}>
        <Show when={!profileResource.loading} fallback={<LoadingSpinner />}>
          <h2 class="account__greeting">
            Hello {profileResource().name ? profileResource().name : "user"},
          </h2>
          <p class="account__text">What would you like to do?</p>
          <div class="account__actions">
            <For each={accountActions}>
              {action => (
                <A
                  class="account__link"
                  href={action.route}
                  onclick={action.onclick}>
                  {action.name}
                </A>
              )}
            </For>
          </div>
          <button
            class="account__button account__button--logout"
            onclick={handleLogout}>
            logout
          </button>
        </Show>
      </ServerError>
    </div>
  )
}

export default Profile
