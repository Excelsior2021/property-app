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
import EditListing from "./pages/EditListing/EditListing"
import MyListings from "./pages/MyListings/MyListings"
import UploadImages from "./pages/UploadImages/UploadImages"
import EditImages from "./pages/EditImages/EditImages"
import { setAccessToken, setLoggedIn } from "./store/store"
import { fetchSavedListingsIds } from "./api/api"
import routes from "./utils/client-routes"
import "./App.scss"

const App: Component = () => {
  const accessToken = localStorage.getItem("accessToken")
  if (accessToken) {
    setAccessToken(accessToken)
    setLoggedIn(true)
    fetchSavedListingsIds()
  }

  return (
    <div class="app">
      <Header />
      <main class="main">
        <Routes>
          <Route path={routes.discover} component={() => <Discover />} />
          <Route
            path={routes.savedListings}
            component={() => <SavedListings />}
          />
          <Route path={routes.login} component={() => <Login />} />
          <Route path={routes.signup} component={() => <Signup />} />
          <Route path={routes.profile} component={() => <Profile />} />
          <Route path={`${routes.listing}/:id`} component={() => <Listing />} />
          <Route path={routes.myListings} component={() => <MyListings />} />
          <Route path={routes.newListing} component={() => <NewListing />} />
          <Route
            path={`${routes.editListing}/:id`}
            component={() => <EditListing />}
          />
          <Route
            path={routes.uploadImages}
            component={() => <UploadImages />}
          />
          <Route
            path={`${routes.manageImages}/:id`}
            component={() => <EditImages />}
          />
        </Routes>
      </main>
      <Navbar />
    </div>
  )
}

export default App
