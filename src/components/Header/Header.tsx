import { Component, Switch, Match, For } from "solid-js"
import { useLocation, A } from "@solidjs/router"
import Search from "../Search/Search"
import { navbarItems } from "../Navbar/Navbar"
import { loggedIn } from "../../store/store"
import routes from "../../utils/client-routes"
import "./Header.scss"

const Header: Component = () => {
  const location = useLocation()

  return (
    <header class="header">
      <div class="header__container">
        <A class="header__link" href="/">
          <div class="header__logo">lifeStyle</div>
        </A>

        <Switch>
          <Match
            when={
              location.pathname === routes.discover ||
              location.pathname.includes(routes.searchResults)
            }>
            <Search />
          </Match>
          <Match when={location.pathname === routes.savedListings}>
            <h1 class="header__heading">saved listings</h1>
          </Match>
          <Match when={location.pathname === routes.login}>
            <h1 class="header__heading">log in</h1>
          </Match>
          <Match when={location.pathname === routes.signup}>
            <h1 class="header__heading">sign up</h1>
          </Match>
          <Match when={location.pathname === routes.profile}>
            <h1 class="header__heading">my profile</h1>
          </Match>
          <Match when={location.pathname === routes.myListings}>
            <h1 class="header__heading">my listings</h1>
          </Match>
          <Match when={location.pathname === routes.newListing}>
            <h1 class="header__heading">new listing</h1>
          </Match>
          <Match when={location.pathname === routes.uploadImages}>
            <h1 class="header__heading">upload images</h1>
          </Match>
          <Match when={location.pathname.includes(routes.editListing)}>
            <h1 class="header__heading">edit listing</h1>
          </Match>
          <Match when={location.pathname.includes(routes.manageImages)}>
            <h1 class="header__heading">manage images</h1>
          </Match>
          <Match when={location.pathname === routes.searchResults}>
            <Search />
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
                  <A
                    class="nav__link"
                    href={item.link}
                    activeClass="nav__link--active"
                    end>
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
