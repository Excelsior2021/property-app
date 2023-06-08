import { Component } from "solid-js"
import { useNavigate } from "@solidjs/router"
import ImageContainer from "../ImageContainer/ImageContainer"
import PropertyDetails from "../PropertyDetails/PropertyDetails"
import { accessToken } from "../../store/store"
import { listingType } from "../../types/general"
import "./ListingItem.scss"

interface PropertyItemProps {
  listing: listingType
}

const PropertyItem: Component<PropertyItemProps> = props => {
  const navigate = useNavigate()

  const handleSave = async (event, listing) => {
    event.stopPropagation()

    const date = new Date().toISOString()
    console.log(listing)
    console.log(date)
    const {
      property: { email, id },
    } = listing

    const res = await fetch("http://localhost:8080/like", {
      method: "POST",
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

    console.log(await res)

    const res2 = await fetch("http://localhost:8080/likes", {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    })
    console.log(await res2.json())
  }

  const handleNavigate = () => {
    navigate(`/listing/${props.listing.property.id}`)
  }

  return (
    <li class="listing-item" onclick={handleNavigate}>
      <ImageContainer images={props.listing.images} />

      <img
        class="listing-item__icon"
        src="./icons/saved.svg"
        alt="save property"
        onclick={event => handleSave(event, props.listing)}
      />

      <div class="listing-item__details">
        <PropertyDetails
          propertyDetails={props.listing.property.propertyDetails}
        />
      </div>
    </li>
  )
}

export default PropertyItem
