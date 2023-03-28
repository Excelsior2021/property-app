import type { Component } from "solid-js"
import Header from "./components/Header/Header"
import PropertyListings from "./components/PropertyListings/PropertyListings"
import "./App.scss"
import Navbar from "./components/Navbar/Navbar"

const App: Component = () => {
  return (
    <>
      <Header />
      <main class="main">
        <PropertyListings />
      </main>
      <Navbar />
    </>
  )
}

export default App
