import { accessToken, setSavedListingsIds } from "../store/store"
import { listingType } from "../types/general"
import { getSavedListings } from "./api-endpoints"

export const fetchSavedListingsIds = async () => {
  const res = await fetch(getSavedListings, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
  const data = await res.json()

  const savedListingsIds = data.map(
    (listing: listingType) => listing.property.id
  )
  setSavedListingsIds(savedListingsIds)
}
