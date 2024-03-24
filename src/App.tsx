import { Component } from "solid-js"
import { Routes, Route, Navigate, Outlet } from "@solidjs/router"
import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import Discover from "./pages/Discover/Discover"
import SavedListings from "./pages/SavedListings/SavedListings"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Account from "./pages/Account/Account"
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
import { fetchSavedListingsIds } from "./api/api"
import routes from "./utils/client-routes"
import "./App.scss"
import MyDetails from "./pages/MyDetails/MyDetails"
import EmailVerified from "./pages/EmailVerified/EmailVerified"

const App: Component = () => {
  if (localStorage.accessToken) {
    setAccessToken(localStorage.accessToken)
    setLoggedIn(true)
    fetchSavedListingsIds()
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
                <Navigate href={routes.account} />
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
            <Route path={routes.account} component={Account} />
            <Route path={routes.myListings} component={MyListings} />
            <Route path={routes.newListing} component={NewListing} />
            <Route path={routes.myDetails} component={MyDetails} />
            <Route
              path={`${routes.editListing}/${routes.listingId}`}
              component={EditListing}
            />
            <Route path={routes.uncaught} element={() => null}></Route>
            <Route path={routes.uploadImages} component={UploadImages} />
            <Route
              path={`${routes.manageImages}/${routes.listingId}`}
              component={EditImages}
            />
            <Route
              path={routes.emailVerificationLink}
              element={EmailVerified}
            />
          </Route>
        </Routes>
      </main>
      <Navbar />
    </div>
  )
}

export default App
