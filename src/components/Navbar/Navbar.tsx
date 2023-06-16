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
    name: "login",
    link: routes.login,
    icon: "/icons/account.svg",
    login: true,
  },
  {
    name: "profile",
    link: routes.profile,
    icon: "/icons/account.svg",
    profile: true,
  },
]

const Navbar: Component = () => {
  const [showNavbar, setShowNavbar] = createSignal(true)
  const [scrollY, setScrollY] = createSignal(window.pageYOffset)
  const [newScrollY, setNewScrollY] = createSignal(window.pageYOffset)

  window.addEventListener("scroll", () => setNewScrollY(window.scrollY))

  createEffect(() => {
    if (newScrollY() > scrollY()) {
      setShowNavbar(false)
      setScrollY(window.scrollY - 1)
    } else {
      setShowNavbar(true)
      setScrollY(window.scrollY + 1)
    }
  })

  return (
    <>
      <nav class={showNavbar() ? "navbar" : "navbar navbar--scroll-down"}>
        <ul class="navbar__list">
          <For each={navbarItems}>
            {item => (
              <li
                class={
                  loggedIn() && item.profile
                    ? "navbar__item"
                    : loggedIn() && item.login
                    ? "navbar__hide"
                    : !loggedIn() && item.profile
                    ? `navbar__hide`
                    : "navbar__item"
                }>
                <A class="navbar__link" href={item.link}>
                  <img class="navbar__icon" src={item.icon} alt={item.name} />
                  <span class="navbar__text">{item.name}</span>
                </A>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
