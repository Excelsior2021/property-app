import { Setter } from "solid-js"

export interface imageObjType {
  id: string
  path: string
  propertyId: string
}

export interface propertyType {
  id: string
  email: string
  propertyDetails: listingDetailsType
}

export interface listingType {
  images: imageObjType[]
  property: propertyType
}

export interface listingDetailsType {
  title: string
  price: number
  description: string
  location: string
  phone: string
}

export type handleFormInputType = (
  event: Event & {
    currentTarget: HTMLInputElement | HTMLTextAreaElement
  },
  setter: Setter<{}>,
  setServerError: Setter<boolean>
) => void
