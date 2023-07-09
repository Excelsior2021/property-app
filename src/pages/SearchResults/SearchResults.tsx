import { Component, Show } from "solid-js"
import Listings from "../../components/Listings/Listings"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { searchResults, searchTermGlobal } from "../../components/Search/Search"
import "./SearchResults.scss"

const SearchResults: Component = () => {
  return (
    <div class="search-results">
      <Show when={searchResults()} fallback={<LoadingSpinner />}>
        <p class="search-results__text">
          {searchResults().listing.length} search result
          {searchResults().listing.length === 1 ? "" : "s"} for "
          {searchTermGlobal()}"
        </p>
        <Listings
          listings={searchResults().listing}
          edit={false}
          search={true}
        />
      </Show>
    </div>
  )
}

export default SearchResults
