import { Setter } from "solid-js"

export interface imageObjType {
  id: string
  path: string
  propertyId: string
}

export interface listingDataType {
  id: string
  email: string
  title: string
  price: number
  description: string
  location: string
  phone: string
}

export interface listingType {
  images: imageObjType[]
  listing: listingDataType
}

export type handleFormInputType = (
  event: Event & {
    currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  },
  setter: Setter<{}>
) => void
