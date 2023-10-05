const serverDomain = import.meta.env.VITE_SERVER_DOMAIN

export const signup = `${serverDomain}/api/v1/auth/signup`

export const login = `${serverDomain}/api/v1/auth/login`

export const profile = `${serverDomain}/profile`

export const uploadImage = (propertyId: string) =>
  `${serverDomain}/upload?propertyId=${propertyId}`

export const listing = `${serverDomain}/property`

export const editListing = (propertyId: string) =>
  `${serverDomain}/property?propertyId=${propertyId}`

export const getListings = `${serverDomain}/api/v1/homes/listing`

export const saveListing = `${serverDomain}/save`

export const unsaveListing = `${serverDomain}/unsave`

export const getSavedListings = `${serverDomain}/likes`

export const getListingDetails = (propertyId: string) =>
  `${serverDomain}/api/v1/homes/property/${propertyId}`

export const deleteImage = `${serverDomain}/image`

export const search = `${serverDomain}/api/v1/search`

export const getLocations = `${serverDomain}/api/v1/locations`

export const sendEmailVerification = (email: string) =>
  `${serverDomain}/api/v1/email/send?email=${email}`
