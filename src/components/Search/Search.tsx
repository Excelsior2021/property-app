import { Component, createSignal } from "solid-js"
import { search } from "../../api/api-endpoints"
import { handleServerError } from "../../utils/utils"
import "./Search.scss"

export const [searchResults, setSearchResults] = createSignal(null)

const Search: Component = () => {
  const [searchTerm, setSearchTerm] = createSignal("")

  const handleClick = async () => {
    let res

    try {
      res = await fetch(search, {
        method: "POST",
        body: JSON.stringify({
          location: searchTerm(),
        }),
      })

      const data = await res.json()
      console.log(data)

      if (res.status === 200) setSearchResults(data)
      else throw new Error()
      setSearchTerm("")
    } catch (error) {
      handleServerError(res)
    }
  }

  return (
    <div class="search">
      <img class="search__icon" src="/icons/discover.svg" alt="search" />
      <input
        class="search__input"
        type="text"
        name="search"
        id="search"
        placeholder="what are you looking for?"
        value={searchTerm()}
        onchange={e => setSearchTerm(e.currentTarget.value)}
      />
      <button class="search__button" onclick={handleClick}>
        search
      </button>
    </div>
  )
}

export default Search
