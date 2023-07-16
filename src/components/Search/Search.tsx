import { Component, createSignal } from "solid-js"
import { useNavigate } from "@solidjs/router"
import routes from "../../utils/client-routes"
import "./Search.scss"

const Search: Component = () => {
  const [searchTerm, setSearchTerm] = createSignal("")
  const navigate = useNavigate()

  const handleSearch = async () => {
    if (searchTerm().trim() === "") return
    navigate(`${routes.searchResults}/?location=${searchTerm()}`)
    setSearchTerm("")
  }

  return (
    <div class="search">
      <button class="search__button" onclick={handleSearch}>
        <img class="search__icon" src="/icons/discover.svg" alt="search" />
      </button>
      <input
        class="search__input"
        type="text"
        name="search"
        id="search"
        placeholder="search location"
        value={searchTerm()}
        onchange={e => setSearchTerm(e.currentTarget.value)}
      />
    </div>
  )
}

export default Search
