import { Component, For } from "solid-js"
import "./Navbar.scss"

const navbarItems = [
  {
    name: "discover",
    link: "#",
    icon: "./icons/discover.svg",
  },
  {
    name: "saved",
    link: "#",
    icon: "./icons/saved.svg",
  },
  {
    name: "log in",
    link: "#",
    icon: "./icons/account.svg",
  },
]

const Navbar: Component = () => {
  return (
    <nav class="navbar">
      <ul class="navbar__list">
        <For each={navbarItems}>
          {item => (
            <li class="navbar__item">
              <img class="navbar__icon" src={item.icon} alt={item.name} />
              <span class="navbar__text">{item.name}</span>
            </li>
          )}
        </For>
      </ul>
    </nav>
  )
}

export default Navbar
