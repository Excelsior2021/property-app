import { Component, Switch, Match, For, createSignal } from "solid-js"
import { useLocation, A } from "@solidjs/router"
import Search from "../Search/Search"
import AccountMenu from "../AccountMenu/AccountMenu"
import { navbarItems } from "../Navbar/Navbar"
import { loggedIn } from "../../store/store"
import routes from "../../utils/client-routes"
import headings from "../../utils/page-headings"
import "./Header.scss"

interface searchHeaderProps {
  wideOnly?: boolean
}

const SearchHeader: Component<searchHeaderProps> = props => {
  return (
    <div
      class={
        props.wideOnly
          ? "header__search header__search--wide"
          : "header__search"
      }>
      <Search />
    </div>
  )
}

const Header: Component = () => {
  const location = useLocation()
  const [showMenu, setShowMenu] = createSignal(false)

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
            <SearchHeader />
          </Match>
          <Match when={location.pathname === routes.savedListings}>
            <h1 class="header__heading">{headings.savedListings}</h1>
            <SearchHeader wideOnly={true} />
          </Match>
          <Match when={location.pathname === routes.login}>
            <h1 class="header__heading">{headings.login}</h1>
          </Match>
          <Match when={location.pathname === routes.signup}>
            <h1 class="header__heading">{headings.signup}</h1>
          </Match>
          <Match when={location.pathname === routes.account}>
            <h1 class="header__heading">{headings.account}</h1>
            <SearchHeader wideOnly={true} />
          </Match>
          <Match when={location.pathname === routes.myDetails}>
            <h1 class="header__heading">{headings.myDetails}</h1>
            <SearchHeader wideOnly={true} />
          </Match>
          <Match when={location.pathname === routes.myListings}>
            <h1 class="header__heading">{headings.myDetails}</h1>
            <SearchHeader wideOnly={true} />
          </Match>
          <Match when={location.pathname === routes.newListing}>
            <h1 class="header__heading">{headings.newListing}</h1>
          </Match>
          <Match when={location.pathname === routes.uploadImages}>
            <h1 class="header__heading">{headings.uploadImages}</h1>
          </Match>
          <Match when={location.pathname.includes(routes.editListing)}>
            <h1 class="header__heading">{headings.editListing}</h1>
          </Match>
          <Match when={location.pathname.includes(routes.manageImages)}>
            <h1 class="header__heading">{headings.manageImages}</h1>
          </Match>
          <Match when={location.pathname === routes.searchResults}>
            <SearchHeader />
          </Match>
          <Match when={location.pathname.includes(routes.listing)}>
            <SearchHeader wideOnly={true} />
          </Match>
        </Switch>

        <nav class="header__nav">
          <ul class="header__list">
            <For each={navbarItems}>
              {item => {
                if (!item.account) {
                  return (
                    <li
                      class={
                        loggedIn() && item.login
                          ? `nav__item nav__item--hide`
                          : "nav__item"
                      }>
                      <A
                        class="nav__link"
                        href={item.link}
                        activeClass="nav__link--active"
                        end>
                        <img
                          class="nav__icon"
                          src={item.icon}
                          alt={item.name}
                        />
                        <span class="nav__text">{item.name}</span>
                      </A>
                    </li>
                  )
                }
              }}
            </For>
            {loggedIn() && (
              <li class="nav__item" onclick={() => setShowMenu(prev => !prev)}>
                <img
                  class="nav__icon--account"
                  src={navbarItems[3].icon}
                  alt={navbarItems[3].name}
                />
              </li>
            )}
          </ul>
        </nav>
        {showMenu() && <AccountMenu setShowMenu={setShowMenu} />}
      </div>
    </header>
  )
}

export default Header
