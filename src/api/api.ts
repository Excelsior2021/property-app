import { accessToken, setSavedListingsIds } from "../store/store"
import { listingType } from "../types/general"
import { handleServerError } from "../utils/utils"
import {
  getListingDetails,
  getSavedListings,
  saveListing,
  unsaveListing,
} from "./api-endpoints"

export const fetchSavedListingsIds = async () => {
  let res
  try {
    res = await fetch(getSavedListings, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    })

    if (res.status === 200) {
      const data = await res.json()

      const savedListingsIds = data.map(
        (listing: listingType) => listing.property.id
      )
      setSavedListingsIds(savedListingsIds)
    } else throw new Error()
  } catch (error) {
    handleServerError(res)
  }
}

export const fetchListingDetails = async (propertyId: string) => {
  let res
  try {
    res = await fetch(getListingDetails(propertyId))
    if (res.status === 200) return await res.json()
    else throw new Error()
  } catch (error) {
    handleServerError(res)
  }
}

export const handleSave = async (listing: listingType, save: boolean) => {
  const date = new Date().toISOString()
  const {
    property: { email, id },
  } = listing
  const route = save ? saveListing : unsaveListing
  let res

  try {
    res = await fetch(route, {
      method: save ? "POST" : "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken()}`,
      },
      body: JSON.stringify({
        userId: email,
        propertyId: id,
        createdAt: date,
      }),
    })

    if (res.status === 201) fetchSavedListingsIds()
    else throw new Error()
  } catch (error) {
    handleServerError(res)
  }
}
