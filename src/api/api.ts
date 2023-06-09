import { accessToken, setSavedListingsIds } from "../store/store"
import { getSavedListings } from "./api-endpoints"

export const fetchSavedListingsIds = async () => {
  const savedListingsIds = []
  const res = await fetch(getSavedListings, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
  const data = await res.json()
  for (const listing of data) {
    savedListingsIds.push(listing.property.id)
  }
  setSavedListingsIds(savedListingsIds)
}
