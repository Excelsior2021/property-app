import { Component } from "solid-js"
import { Routes, Route } from "@solidjs/router"
import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import Discover from "./pages/Discover/Discover"
import SavedProperties from "./pages/SavedProperties/SavedProperties"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import "./App.scss"

const App: Component = () => {
  return (
    <div class="app">
      <Header />
      <main class="main">
        <Routes>
          <Route path="/" component={() => <Discover />} />
          <Route path="/saved" component={() => <SavedProperties />} />
          <Route path="/login" component={() => <Login />} />
          <Route path="/register" component={() => <Register />} />
        </Routes>
      </main>
      <Navbar />
    </div>
  )
}

export default App
