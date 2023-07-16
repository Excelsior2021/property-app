import { createSignal } from "solid-js"

const stringArray: string[] = []

export const [loggedIn, setLoggedIn] = createSignal(false)

export const [userData, setUserData] = createSignal({
  name: "",
})

export const [accessToken, setAccessToken] = createSignal("")

export const [savedListingsIds, setSavedListingsIds] = createSignal(stringArray)

export const [currentListing, setCurrentListing] = createSignal(null)

export const [errorMessage, setErrorMessage] = createSignal("")

export const [modal, setModal] = createSignal(false)

export const [modalOverlayData, setModalOverlayData] = createSignal({
  message: "",
  buttonText: "",
  buttonHandler: () => {},
})

export const [refetch, setRefetch] = createSignal(null)
