export interface imageObjType {
  id: string
  path: string
  propertyId: string
}

export interface propertyType {
  id: number
  propertyDetails: propertyDetailsType
}

export interface listingType {
  images: imageObjType[]
  property: propertyType
  email: string
}

export interface propertyDetailsType {
  title: string
  price: number
  description: string
  location: string
  phone: string
}
