export const register = "http://localhost:8080/api/auth/v1/signup"

export const login = "http://localhost:8080/api/auth/v1/login"

export const profile = "http://localhost:8080/profile"

export const uploadImage = (propertyId: string) =>
  `http://localhost:8080/upload?propertyId=${propertyId}`

export const listing = "http://localhost:8080/property"

export const getListings = "http://localhost:8080/api/homes/v1/listing"

export const saveListing = "http://localhost:8080/like"

export const unsaveListing = "http://localhost:8080/unlike"

export const getSavedListing = "http://localhost:8080/likes"

export const getListingDetails = (propertyId: string) =>
  `http://localhost:8080/api/homes/v1/property/${propertyId}`

export const deleteImage = "http://localhost:8080/image"
