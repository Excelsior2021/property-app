import { Component, Switch, Match } from "solid-js"
import { useLocation } from "@solidjs/router"
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
            <h2 class="header__heading">saved properties</h2>
          </Match>
          <Match when={location.pathname === "/login"}>
            <h2 class="header__heading">log in</h2>
          </Match>
          <Match when={location.pathname === "/register"}>
            <h2 class="header__heading">register</h2>
          </Match>
        </Switch>
      </div>
    </header>
  )
}

export default Header
