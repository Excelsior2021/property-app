import {
  setStoredImages,
  setUploadedImages,
} from "../components/ManageImages/ManageImages"
import {
  accessToken,
  setCurrentListing,
  setSavedListingsIds,
} from "../store/store"
import { listingDataType, listingType } from "../types/general"
import { handleServerError } from "../utils/utils"
import {
  deleteImage,
  getListingDetails,
  getListings,
  getSavedListings,
  listing,
  profile,
  saveListing,
  sendEmailVerification,
  unsaveListing,
  verifyEmail,
} from "./api-endpoints"

export const fetchUserDetails = async () => {
  let res
  try {
    res = await fetch(profile, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    })

    if (res.status === 200) {
      const data = await res.json()
      return data
    }
  } catch (error) {
    handleServerError(res)
  }
}

export const fetchListings = async () => {
  let res
  try {
    res = await fetch(getListings)
    if (res.status !== 200) throw new Error()
    return await res.json()
  } catch (error) {
    handleServerError(res)
  }
}

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
        (listing: listingType) => listing.listing.id
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
    if (res.status === 200) {
      const data = await res.json()
      return data
    } else throw new Error()
  } catch (error) {
    handleServerError(res)
  }
}

export const handleSave = async (listing: listingDataType, save: boolean) => {
  const date = new Date().toISOString()
  const { email, id } = listing
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

export const handleDeleteListing = async (listingId: string, refetch) => {
  let res
  try {
    res = await fetch(listing, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken()}`,
      },
      body: JSON.stringify({
        propertyId: listingId,
      }),
    })
    if (res.status === 201) {
      refetch()
    } else throw new Error()
  } catch (error) {
    handleServerError(res)
  }
}

export const handleDeleteImage = async (
  type: string,
  imageId: string,
  propertyId: string
) => {
  if (type === "uploaded") {
    setUploadedImages(prevState =>
      prevState.filter(image => image.id !== imageId)
    )
  }

  if (type === "stored") {
    let res
    try {
      res = await fetch(deleteImage, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken()}`,
        },
        body: JSON.stringify({
          imageId,
          propertyId,
        }),
      })

      if (res.status === 201) {
        const updatedListing = await fetchListingDetails(propertyId)
        setStoredImages([])
        setCurrentListing(updatedListing)
      } else throw new Error()
    } catch (error) {
      handleServerError(res)
    }
  }
}

export const handleVerifySendEmail = async (email: string) => {
  let res
  try {
    res = await fetch(sendEmailVerification(email))
    if (res.status === 200) return true
    else throw new Error()
  } catch (error) {
    handleServerError(res)
  }
}

export const handleVerifyEmail = async (token: string) => {
  let res
  try {
    res = await fetch(verifyEmail(token))
    if (res.status === 200 || res.status === 400) return res.status
    else throw new Error()
  } catch (error) {
    handleServerError(res)
  }
}
