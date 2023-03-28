import { Component } from "solid-js"
import "./Header.scss"

const Header: Component = () => (
  <header class="header">
    <div class="header__container">
      <div class="header__logo">lifeStyle</div>

      <img class="header__icon" src="./icons/discover.svg" alt="search" />

      <input
        class="header__search"
        type="text"
        name="search"
        id="search"
        placeholder="where do you want to live?"
      />

      {/* <nav class="nav">
        <ul class="nav__list">
          <li class="nav__item">
            <a class="nav__link" href="#">
              sign in
            </a>
          </li>
        </ul>
      </nav> */}
    </div>
  </header>
)

export default Header
