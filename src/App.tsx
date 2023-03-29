import { Component, createEffect, createSignal } from "solid-js"
import { Routes, Route } from "@solidjs/router"
import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import Discover from "./pages/Discover/Discover"
import Login from "./pages/Login/Login"
import SavedProperties from "./pages/SavedProperties/SavedProperties"
import "./App.scss"

const [showNavbar, setShowNavbar] = createSignal(true)
const [scrollY, setScrollY] = createSignal(window.pageYOffset)

createEffect(() => {
  console.log(window.screenY, scrollY())
  if (window.scrollY > scrollY()) {
    setShowNavbar(false)
    setScrollY(window.scrollY)
    console.log("scroll down")
  } else {
    setShowNavbar(true)
    setScrollY(window.scrollY)
    console.log("scroll up")
  }
})

const App: Component = () => {
  return (
    <div class="app">
      <Header />
      <main class="main">
        <Routes>
          <Route path="/" component={<Discover />} />
          <Route path="/login" component={<Login />} />
          <Route path="/saved" component={<SavedProperties />} />
        </Routes>
      </main>
      <Navbar />
    </div>
  )
}

export default App
