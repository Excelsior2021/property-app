import { Component, Switch, Match, For } from "solid-js"
import { useLocation, A } from "@solidjs/router"
import { navbarItems } from "../Navbar/Navbar"
import { loggedIn } from "../../store/store"
import "./Header.scss"

const Header: Component = () => {
  const location = useLocation()

  return (
    <header class="header">
      <div class="header__container">
        <div class="header__logo">lifeStyle</div>

        <Switch>
          <Match when={location.pathname === "/"}>
            <img class="header__icon" src="./icons/discover.svg" alt="search" />
            <input
              class="header__search"
              type="text"
              name="search"
              id="search"
              placeholder="where do you want to live?"
            />
          </Match>
          <Match when={location.pathname === "/saved"}>
            <h1 class="header__heading">saved properties</h1>
          </Match>
          <Match when={location.pathname === "/login"}>
            <h1 class="header__heading">log in</h1>
          </Match>
          <Match when={location.pathname === "/register"}>
            <h1 class="header__heading">register</h1>
          </Match>
          <Match when={location.pathname === "/new-listing"}>
            <h1 class="header__heading">new listing</h1>
          </Match>
        </Switch>

        <nav class="header__nav">
          <ul class="header__list">
            <For each={navbarItems}>
              {item => (
                <li
                  class={
                    loggedIn() && item.profile
                      ? "nav__item"
                      : loggedIn() && item.login
                      ? "nav__hide"
                      : !loggedIn() && item.profile
                      ? `nav__hide`
                      : "nav__item"
                  }>
                  <A class="nav__link" href={item.link}>
                    <img class="nav__icon" src={item.icon} alt={item.name} />
                    <span class="nav__text">{item.name}</span>
                  </A>
                </li>
              )}
            </For>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
