import {
  setStoredImages,
  setUploadedImages,
} from "../components/ManageImages/ManageImages"
import {
  accessToken,
  setCurrentListing,
  setSavedListingsIds,
  setUserData,
} from "../store/store"
import { listingDataType, listingType } from "../types/general"
import { handleServerError } from "../utils/utils"
import {
  deleteImage,
  getListingDetails,
  getSavedListings,
  listing,
  profile,
  saveListing,
  unsaveListing,
} from "./api-endpoints"

export const fetchProfile = async () => {
  let res
  try {
    res = await fetch(profile, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    })

    if (res.status === 200) {
      const { name, email } = await res.json()
      setUserData({
        name,
        email,
      })
      return { name, email }
    }
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
        // setUploadedImages([])
        setCurrentListing(updatedListing)
      } else throw new Error()
    } catch (error) {
      handleServerError(res)
    }
  }
}
