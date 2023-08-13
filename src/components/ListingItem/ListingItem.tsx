import { Component } from "solid-js"
import { useNavigate } from "@solidjs/router"
import ImageContainer from "../ImageContainer/ImageContainer"
import ListingItemDetails from "../ListingItemDetails/ListingItemDetails"
import {
  loggedIn,
  setCurrentListing,
  setModal,
  setModalOverlayData,
  setPreviousPage,
} from "../../store/store"
import { listingDataType, listingType } from "../../types/general"
import { handleDeleteListing, handleSave } from "../../api/api"
import routes from "../../utils/client-routes"
import "./ListingItem.scss"

interface ListingItemProps {
  listing: listingType
  page: string
  saved: boolean
  edit: boolean
  delete: boolean
  search: boolean
  refetch?: () => {}
}

const ListingItem: Component<ListingItemProps> = props => {
  const navigate = useNavigate()
  let listing: listingDataType

  if (props.search) listing = props.listing
  else listing = props.listing.listing

  const handleClickOnSave = (event: Event, listing: listingDataType) => {
    event.stopPropagation()

    if (loggedIn()) {
      if (props.saved) handleSave(listing, false)
      else handleSave(listing, true)
    } else navigate(routes.login)
  }

  const handleNavigate = (event: Event, requestPage: string) => {
    event.stopPropagation()

    switch (requestPage) {
      case "details":
        setPreviousPage(props.page)
        navigate(`${routes.listing}/${listing.id}`)
        break
      case "edit":
        setCurrentListing(props.listing)
        navigate(`${routes.editListing}/${listing.id}`, {
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
      buttonHandler: () => handleDeleteListing(listing.id, props.refetch),
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
        onclick={event => handleClickOnSave(event, listing)}
      />

      <div class="listing-item__details">
        <ListingItemDetails listing={listing} />
      </div>
    </li>
  )
}

export default ListingItem
