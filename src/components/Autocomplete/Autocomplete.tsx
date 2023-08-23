import { Component, For, Setter } from "solid-js"
import { listingDataType } from "../../types/general"
import "./Autocomplete.scss"

interface autocompleteProps {
  results: string[]
  setSearchTerm: (data: string) => void
  handleSearch: () => void
}

const Autocomplete: Component<autocompleteProps> = props => {
  const handleClick = e => {
    props.setSearchTerm(e.target.id)
    props.handleSearch()
  }

  return (
    <ul class="autocomplete">
      <For each={props.results}>
        {result => (
          <li id={result} class="autocomplete__item" onclick={handleClick}>
            {result}
          </li>
        )}
      </For>
    </ul>
  )
}
export default Autocomplete
