import type { Component } from "solid-js"
import { Routes, Route } from "@solidjs/router"
import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import Discover from "./pages/Discover/Discover"
import Login from "./pages/Login/Login"
import "./App.scss"

const App: Component = () => {
  return (
    <div class="app">
      <Header />
      <main class="main">
        <Routes>
          <Route path="/" component={<Discover />} />
          <Route path="/login" component={<Login />} />
        </Routes>
      </main>
      <Navbar />
    </div>
  )
}

export default App
