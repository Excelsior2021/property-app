import { Component, Show, createResource } from "solid-js"
import dummyListings from "../../data/listings.json"
import Listings from "../../components/Listings/Listings"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import ServerError from "../../components/ServerError/ServerError"
import { errorMessage } from "../../store/store"
import routes from "../../utils/client-routes"
import headings from "../../utils/page-headings"
import { fetchListings } from "../../api/api"
import "./Discover.scss"

const Discover: Component = () => {
  const [listings] = createResource(fetchListings)

  const fallback = <p class="discover__no-data">There aren't any listings :(</p>

  return (
    <div class="discover">
      <ServerError error={errorMessage()}>
        <Show when={!listings.loading} fallback={<LoadingSpinner />}>
          <Show
            when={listings().length > 0 || dummyListings.length > 0}
            fallback={fallback}>
            <Listings
              listings={dummyListings.concat(listings())}
              heading={headings.discover}
              page={routes.discover}
            />
          </Show>
        </Show>
      </ServerError>
    </div>
  )
}

export default Discover
