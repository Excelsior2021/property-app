export const signup = `${import.meta.env.VITE_SERVER_DOMAIN}/api/auth/v1/signup`

export const login = `${import.meta.env.VITE_SERVER_DOMAIN}/api/auth/v1/login`

export const profile = `${import.meta.env.VITE_SERVER_DOMAIN}/profile`

export const uploadImage = (propertyId: string) =>
  `${import.meta.env.VITE_SERVER_DOMAIN}/upload?propertyId=${propertyId}`

export const listing = `${import.meta.env.VITE_SERVER_DOMAIN}/property`

export const getListings = `${
  import.meta.env.VITE_SERVER_DOMAIN
}/api/homes/v1/listing`

export const saveListing = `${import.meta.env.VITE_SERVER_DOMAIN}/save`

export const unsaveListing = `${import.meta.env.VITE_SERVER_DOMAIN}/unsave`

export const getSavedListings = `${import.meta.env.VITE_SERVER_DOMAIN}/likes`

export const getListingDetails = (propertyId: string) =>
  `${import.meta.env.VITE_SERVER_DOMAIN}/api/homes/v1/property/${propertyId}`

export const deleteImage = `${import.meta.env.VITE_SERVER_DOMAIN}/image`
