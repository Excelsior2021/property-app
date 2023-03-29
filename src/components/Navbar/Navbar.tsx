import { Component, For, createSignal, createEffect } from "solid-js"
import { A } from "@solidjs/router"
import "./Navbar.scss"

const navbarItems = [
  {
    name: "discover",
    link: "/",
    icon: "./icons/discover.svg",
  },
  {
    name: "saved",
    link: "/saved",
    icon: "./icons/saved.svg",
  },
  {
    name: "log in",
    link: "/login",
    icon: "./icons/account.svg",
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
      {showNavbar() && (
        <nav class="navbar">
          <ul class="navbar__list">
            <For each={navbarItems}>
              {item => (
                <li class="navbar__item">
                  <A class="navbar__link" href={item.link}>
                    <img class="navbar__icon" src={item.icon} alt={item.name} />
                    <span class="navbar__text">{item.name}</span>
                  </A>
                </li>
              )}
            </For>
          </ul>
        </nav>
      )}
    </>
  )
}

export default Navbar
