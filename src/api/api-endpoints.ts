export const signup = `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/auth/signup`

export const login = `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/auth/login`

export const profile = `${import.meta.env.VITE_SERVER_DOMAIN}/profile`

export const uploadImage = (propertyId: string) =>
  `${import.meta.env.VITE_SERVER_DOMAIN}/upload?propertyId=${propertyId}`

export const listing = `${import.meta.env.VITE_SERVER_DOMAIN}/property`

export const editListing = (propertyId: string) =>
  `${import.meta.env.VITE_SERVER_DOMAIN}/property?propertyId=${propertyId}`

export const getListings = `${
  import.meta.env.VITE_SERVER_DOMAIN
}/api/v1/homes/listing`

export const saveListing = `${import.meta.env.VITE_SERVER_DOMAIN}/save`

export const unsaveListing = `${import.meta.env.VITE_SERVER_DOMAIN}/unsave`

export const getSavedListings = `${import.meta.env.VITE_SERVER_DOMAIN}/likes`

export const getListingDetails = (propertyId: string) =>
  `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/homes/property/${propertyId}`

export const deleteImage = `${import.meta.env.VITE_SERVER_DOMAIN}/image`

export const search = `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/search`
