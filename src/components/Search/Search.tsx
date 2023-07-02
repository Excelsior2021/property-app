import { Component, createSignal } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { search } from "../../api/api-endpoints"
import { handleServerError } from "../../utils/utils"
import routes from "../../utils/client-routes"
import "./Search.scss"

export const [searchResults, setSearchResults] = createSignal(null)
export const [searchTermGlobal, setSearchTermGlobal] = createSignal("")

const Search: Component = () => {
  const [searchTerm, setSearchTerm] = createSignal("")
  const navigate = useNavigate()

  const handleSearch = async () => {
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

      if (res.status === 200) {
        setSearchResults(data)
        navigate(routes.searchResults)
      } else throw new Error()
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
        placeholder="where do you want to stay?"
        value={searchTerm()}
        onchange={e => {
          setSearchTerm(e.currentTarget.value)
          setSearchTermGlobal(e.currentTarget.value)
        }}
      />
      <button class="search__button" onclick={handleSearch}>
        search
      </button>
    </div>
  )
}

export default Search
