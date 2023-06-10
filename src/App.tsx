import { Component } from "solid-js"
import { Routes, Route } from "@solidjs/router"
import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import Discover from "./pages/Discover/Discover"
import SavedListings from "./pages/SavedListings/SavedListings"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Profile from "./pages/Profile/Profile"
import Listing from "./pages/Listing/Listing"
import NewListing from "./pages/NewListing/NewListing"
import MyListings from "./pages/MyListings/MyListings"
import UploadImages from "./pages/UploadImages/UploadImages"
import { setAccessToken, setLoggedIn } from "./store/store"
import "./App.scss"

const App: Component = () => {
  const accessToken = localStorage.getItem("accessToken")
  if (accessToken) {
    setAccessToken(accessToken)
    setLoggedIn(true)
  }
  return (
    <div class="app">
      <Header />
      <main class="main">
        <Routes>
          <Route path="/" component={() => <Discover />} />
          <Route path="/saved" component={() => <SavedListings />} />
          <Route path="/login" component={() => <Login />} />
          <Route path="/sign-up" component={() => <Signup />} />
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
