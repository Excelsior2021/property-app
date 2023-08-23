import { Component, createSignal } from "solid-js"
import { useNavigate } from "@solidjs/router"
import Autocomplete from "../Autocomplete/Autocomplete"
import routes from "../../utils/client-routes"
import { handleServerError } from "../../utils/utils"
import { search } from "../../api/api-endpoints"
import { listingDataType } from "../../types/general"
import "./Search.scss"

const Search: Component = () => {
  const [searchTerm, setSearchTerm] = createSignal("")
  const [autocompleteResults, setAutoCompleteResults] = createSignal(null)
  const navigate = useNavigate()

  const handleSearch = async () => {
    if (searchTerm().trim() === "") return
    navigate(`${routes.searchResults}/?location=${searchTerm()}`)
    setSearchTerm("")
    setAutoCompleteResults(null)
  }

  const handleAutocomplete = async (
    e: Event & {
      currentTarget: HTMLInputElement
    }
  ) => {
    let res
    setSearchTerm(e.currentTarget.value)

    if (e.currentTarget.value === "") {
      setAutoCompleteResults(null)
    } else {
      try {
        res = await fetch(search, {
          method: "POST",
          body: JSON.stringify({
            location: e.currentTarget.value,
          }),
        })

        const data = await res.json()
        const locations = data.listing.map(
          (listing: listingDataType) => listing.location
        )
        setAutoCompleteResults([...new Set(locations)])

        if (res.status !== 200) throw new Error()
      } catch (error) {
        handleServerError(res)
      }
    }
  }

  return (
    <div class="search">
      <div class="search__container">
        <input
          class="search__input"
          type="search"
          name="search"
          id="search"
          placeholder="search location"
          value={searchTerm()}
          oninput={handleAutocomplete}
          onkeyup={e => {
            if (e.key === "Enter") handleSearch()
          }}
          autocomplete="off"
        />
        <button class="search__button" onclick={handleSearch}>
          <img class="search__icon" src="/icons/discover.svg" alt="search" />
        </button>
      </div>
      {autocompleteResults() && autocompleteResults().length > 0 && (
        <div class="search__autocomplete">
          <Autocomplete
            results={autocompleteResults()}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
        </div>
      )}
    </div>
  )
}

export default Search
