import { Component, Show, createResource, createSignal } from "solid-js"
import { accessToken, errorMessage, loggedIn } from "../../store/store"
import { getSavedListings } from "../../api/api-endpoints"
import Listings from "../../components/Listings/Listings"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import ServerError from "../../components/ServerError/ServerError"
import { handleServerError } from "../../utils/utils"
import routes from "../../utils/client-routes"
import "./SavedListings.scss"

const SavedListings: Component = () => {
  const fetchListings = async () => {
    let res
    try {
      if (loggedIn()) {
        res = await fetch(getSavedListings, {
          headers: {
            Authorization: `Bearer ${accessToken()}`,
          },
        })
        return await res.json()
      }
    } catch (error) {
      handleServerError(res)
    }
  }

  const [savedListings] = createResource(fetchListings)

  const loginFallback = (
    <p class="saved-listings__fallback-text">
      Please log in to see your saved listings
    </p>
  )

  const noDataFallback = (
    <p class="saved-listings__fallback-text">
      You have not saved any listings. Go and discover some :)
    </p>
  )

  return (
    <div class="saved-listings">
      <Show when={loggedIn()} fallback={loginFallback}>
        <ServerError data={savedListings} error={errorMessage()}>
          <Show when={!savedListings.loading} fallback={<LoadingSpinner />}>
            <Show when={savedListings().length > 0} fallback={noDataFallback}>
              <Listings
                listings={savedListings()}
                heading="my saved listings"
                page={routes.savedListings}
              />
            </Show>
          </Show>
        </ServerError>
      </Show>
    </div>
  )
}

export default SavedListings
