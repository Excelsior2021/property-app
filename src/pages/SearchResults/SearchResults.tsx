import { Component, Show, createResource } from "solid-js"
import Listings from "../../components/Listings/Listings"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { handleServerError } from "../../utils/utils"
import { useSearchParams } from "@solidjs/router"
import { search } from "../../api/api-endpoints"
import ServerError from "../../components/ServerError/ServerError"
import { errorMessage } from "../../store/store"
import routes from "../../utils/client-routes"
import "./SearchResults.scss"

const SearchResults: Component = () => {
  const [searchParams] = useSearchParams()

  const handleSearch = async () => {
    let res

    if (searchParams.location.trim() === "") return

    try {
      res = await fetch(search, {
        method: "POST",
        body: JSON.stringify({
          location: searchParams.location,
        }),
      })

      const data = await res.json()

      if (res.status === 200) return data
      else throw new Error()
    } catch (error) {
      handleServerError(res)
    }
  }

  const [results] = createResource(() => searchParams.location, handleSearch)

  return (
    <div class="search-results">
      <ServerError error={errorMessage()}>
        <Show when={!results.loading} fallback={<LoadingSpinner />}>
          <Listings
            listings={results().listing}
            page={`${routes.searchResults}/?location=${searchParams.location}`}
            heading={`${results().listing.length} search result${
              results().listing.length === 1 ? "" : "s"
            } for "${searchParams.location}"`}
            edit={false}
            search={true}
          />
        </Show>
      </ServerError>
    </div>
  )
}

export default SearchResults
