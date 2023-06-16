import { createSignal } from "solid-js"

const stringArray: string[] = []

export const [loggedIn, setLoggedIn] = createSignal(false)

export const [userData, setUserData] = createSignal({
  name: "",
})

export const [accessToken, setAccessToken] = createSignal("")

export const [savedListingsIds, setSavedListingsIds] = createSignal(stringArray)

export const [currentListing, setCurrentListing] = createSignal({})
