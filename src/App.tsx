import { Component } from "solid-js"
import { Routes, Route } from "@solidjs/router"
import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import Discover from "./pages/Discover/Discover"
import SavedProperties from "./pages/SavedProperties/SavedProperties"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Profile from "./pages/Profile/Profile"
import Property from "./pages/Property/Property"
import UploadImages from "./pages/UploadImages/UploadImages"
import "./App.scss"
import NewListing from "./pages/NewListing/NewListing"

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
          <Route path="/profile" component={() => <Profile />} />
          <Route path="/property/:id" component={() => <Property />} />
          <Route path="/new-listing" component={() => <NewListing />} />
          <Route path="/upload-images" component={() => <UploadImages />} />
        </Routes>
      </main>
      <Navbar />
    </div>
  )
}

export default App
