import { createSignal } from "solid-js"

export const [loggedIn, setLoggedIn] = createSignal(false)

export const [userData, setUserData] = createSignal(null)

export const [accessToken, setAccessToken] = createSignal(null)
