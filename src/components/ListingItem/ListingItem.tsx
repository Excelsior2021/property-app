import { Component } from "solid-js"
import { useNavigate } from "@solidjs/router"
import ImageContainer from "../ImageContainer/ImageContainer"
import ListingItemDetails from "../ListingItemDetails/ListingItemDetails"
import {
  loggedIn,
  setCurrentListing,
  setModal,
  setModalOverlayData,
} from "../../store/store"
import { listingType } from "../../types/general"
import { handleSave } from "../../api/api"
import routes from "../../utils/client-routes"
import { handleDeleteListing } from "../../utils/utils"
import "./ListingItem.scss"

interface ListingItemProps {
  listing: listingType
  saved: boolean
  edit: boolean
  delete: boolean
  search: boolean
  refetch?: () => {}
}

const ListingItem: Component<ListingItemProps> = props => {
  const navigate = useNavigate()

  const handleClickOnSave = (event: Event, listing: listingType) => {
    event.stopPropagation()

    if (loggedIn()) {
      if (props.saved) {
        handleSave(listing, false)
      } else {
        handleSave(listing, true)
      }
    } else {
      navigate(routes.login)
    }
  }

  const handleNavigate = (event: Event, requestPage: string) => {
    event.stopPropagation()

    switch (requestPage) {
      case "details":
        navigate(`${routes.listing}/${props.listing.listing.id}`)
        break
      case "edit":
        setCurrentListing(props.listing)
        navigate(`${routes.editListing}/${props.listing.listing.id}`, {
          state: { listing: props.listing },
        })
        break
      default:
        break
    }
  }

  const handleDelete = async (event: Event) => {
    event.stopPropagation()
    setModal(true)
    setModalOverlayData({
      message:
        "Are you sure you want to delete this listing? This can not be undone.",
      buttonText: "delete",
      buttonHandler: () =>
        handleDeleteListing(props.listing.listing.id, props.refetch),
    })
  }

  return (
    <li
      class="listing-item"
      onclick={event => handleNavigate(event, "details")}>
      <ImageContainer
        images={props.listing.images}
        handleNavigate={handleNavigate}
        handleDelete={handleDelete}
        edit={props.edit}
        delete={props.delete}
      />

      <img
        class="listing-item__icon listing-item__icon--save"
        src={props.saved ? "/icons/saved-active.svg" : "/icons/saved.svg"}
        alt="save listing"
        onclick={event => handleClickOnSave(event, props.listing)}
      />

      <div class="listing-item__details">
        <ListingItemDetails
          listing={props.search ? props.listing : props.listing.listing}
        />
      </div>
    </li>
  )
}

export default ListingItem
