import { Component, createResource, Show } from "solid-js"
import { fetchUserDetails } from "../../api/api"
import ServerError from "../../components/ServerError/ServerError"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { errorMessage } from "../../store/store"
import "./MyDetails.scss"

const MyDetails: Component = () => {
  const [profileResource] = createResource(fetchUserDetails)

  return (
    <div class="my-details">
      <ServerError data={profileResource} error={errorMessage()}>
        <Show when={!profileResource.loading} fallback={<LoadingSpinner />}>
          <div class="my-details__details">
            <img
              class="my-details__img"
              src="/public/icons/profile-pic.svg"
              alt="profile pic"
            />
            <p class="my-details__text my-details__text--name">
              {profileResource().name}
            </p>
            <p class="my-details__text">{profileResource().email}</p>
          </div>
        </Show>
      </ServerError>
    </div>
  )
}

export default MyDetails
