import { Component } from "solid-js"
import { Routes, Route, Navigate, Outlet } from "@solidjs/router"
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
import SearchResults from "./pages/SearchResults/SearchResults"
import Modal from "./components/Modal/Modal"
import {
  modal,
  modalOverlayData,
  setAccessToken,
  setLoggedIn,
} from "./store/store"
import { fetchProfile, fetchSavedListingsIds } from "./api/api"
import routes from "./utils/client-routes"
import "./App.scss"

const App: Component = () => {
  if (localStorage.accessToken) {
    setAccessToken(localStorage.accessToken)
    setLoggedIn(true)
    fetchSavedListingsIds()
    fetchProfile()
  }

  return (
    <div class="app">
      <div class="app__modal">
        {modal() && <Modal data={modalOverlayData()} />}
      </div>
      <Header />
      <main class="app__main">
        <Routes>
          <Route path={routes.discover} component={Discover} />
          <Route path={routes.savedListings} component={SavedListings} />
          <Route
            path={`${routes.listing}/${routes.listingId}`}
            component={Listing}
          />
          <Route
            path={`${routes.searchResults}/${routes.uncaught}`}
            component={SearchResults}
          />
          <Route
            path={routes.uncaught}
            element={() =>
              !localStorage.accessToken ? (
                <Outlet />
              ) : (
                <Navigate href={routes.profile} />
              )
            }>
            <Route path={routes.login} component={Login} />
            <Route path={routes.signup} component={Signup} />
          </Route>
          <Route
            path={routes.uncaught}
            element={() =>
              localStorage.accessToken ? (
                <Outlet />
              ) : (
                <Navigate href={routes.login} />
              )
            }>
            <Route path={routes.profile} component={Profile} />
            <Route path={routes.myListings} component={MyListings} />
            <Route path={routes.newListing} component={NewListing} />
            <Route
              path={`${routes.editListing}/${routes.listingId}`}
              component={EditListing}
            />
            <Route path={routes.uploadImages} component={UploadImages} />
            <Route
              path={`${routes.manageImages}/${routes.listingId}`}
              component={EditImages}
            />
          </Route>
          <Route
            path={routes.uncaught}
            component={() => <div>404: Page Not Found!</div>}
          />
        </Routes>
      </main>
      <Navbar />
    </div>
  )
}

export default App
