import { Component, For, createSignal, createEffect } from "solid-js"
import { A } from "@solidjs/router"
import { loggedIn } from "../../store/store"
import routes from "../../utils/client-routes"
import "./Navbar.scss"

export const navbarItems = [
  {
    name: "discover",
    link: routes.discover,
    icon: "/icons/discover.svg",
  },
  {
    name: "saved",
    link: routes.savedListings,
    icon: "/icons/saved.svg",
  },
  {
    name: "log in",
    link: routes.login,
    icon: "/icons/account.svg",
    login: true,
  },
  {
    name: "account",
    link: routes.account,
    icon: "/icons/account.svg",
    account: true,
  },
]

const Navbar: Component = () => {
  const [showNavbar, setShowNavbar] = createSignal(true)
  const [scrollY, setScrollY] = createSignal(window.scrollY)
  const [newScrollY, setNewScrollY] = createSignal(window.scrollY)

  window.addEventListener("scroll", () => setNewScrollY(window.scrollY))

  createEffect(() => {
    if (newScrollY() > scrollY()) {
      setShowNavbar(false)
      setScrollY(newScrollY() - 1)
    } else if (newScrollY() < scrollY()) {
      setShowNavbar(true)
      setScrollY(newScrollY() + 1)
    }
  })

  return (
    <nav class={showNavbar() ? "navbar" : "navbar navbar--hide"}>
      <ul class="navbar__list">
        <For each={navbarItems}>
          {item => (
            <li
              class={
                loggedIn() && item.account
                  ? "navbar__item"
                  : loggedIn() && item.login
                  ? "navbar__item navbar__item--hide"
                  : !loggedIn() && item.account
                  ? `navbar__item navbar__item--hide`
                  : "navbar__item"
              }>
              <A
                class="navbar__link"
                href={item.link}
                activeClass="navbar__icon--active"
                end>
                <img class="navbar__icon" src={item.icon} alt={item.name} />
                <span class="navbar__text">{item.name}</span>
              </A>
            </li>
          )}
        </For>
      </ul>
    </nav>
  )
}

export default Navbar
