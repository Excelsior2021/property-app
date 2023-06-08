import { Component, createEffect } from "solid-js"
import { Routes, Route } from "@solidjs/router"
import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import Discover from "./pages/Discover/Discover"
import SavedProperties from "./pages/SavedProperties/SavedProperties"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Profile from "./pages/Profile/Profile"
import Listing from "./pages/Listing/Listing"
import NewListing from "./pages/NewListing/NewListing"
import MyListings from "./pages/MyListings/MyListings"
import UploadImages from "./pages/UploadImages/UploadImages"
import "./App.scss"

const App: Component = () => {
  createEffect(() => {})

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
          <Route path="/listing/:id" component={() => <Listing />} />
          <Route path="/my-listings" component={() => <MyListings />} />
          <Route path="/new-listing" component={() => <NewListing />} />
          <Route path="/upload-images" component={() => <UploadImages />} />
        </Routes>
      </main>
      <Navbar />
    </div>
  )
}

export default App
