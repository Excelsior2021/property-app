import { Component, Show, createResource } from "solid-js"
import Listings from "../../components/Listings/Listings"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { getListings } from "../../api/api-endpoints"
import ServerError from "../../components/ServerError/ServerError"
import { handleServerError } from "../../utils/utils"
import { errorMessage } from "../../store/store"
import "./Discover.scss"

const Discover: Component = () => {
  const fetchListings = async () => {
    let res
    try {
      res = await fetch(getListings)
      if (res.status !== 200) throw new Error()
      return await res.json()
    } catch (error) {
      handleServerError(res)
    }
  }

  const [listings] = createResource(fetchListings)

  const fallback = <p class="discover__no-data">There aren't any listings :(</p>

  return (
    <div class="discover">
      <ServerError data={listings} error={errorMessage()}>
        <Show when={!listings.loading} fallback={<LoadingSpinner />}>
          <Show when={listings().length > 0} fallback={fallback}>
            <Listings listings={listings()} />
          </Show>
        </Show>
      </ServerError>
    </div>
  )
}

export default Discover
