import { Component, Show, createEffect, createResource } from "solid-js"
import ListingForm, {
  listingFormData,
} from "../../components/ListingForm/ListingForm"
import "./NewListing.scss"
import headings from "../../utils/page-headings"
import { fetchUserDetails } from "../../api/api"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import PleaseVerify from "../../components/PleaseVerify/PleaseVerify"
import ServerError from "../../components/ServerError/ServerError"
import { errorMessage } from "../../store/store"

const NewListing: Component = () => {
  const [user, { mutate, refetch }] = createResource(fetchUserDetails)

  createEffect(async () => {
    const user = await fetchUserDetails()
    mutate(user)
  })

  return (
    <ServerError error={errorMessage()}>
      <Show when={user && !user.loading} fallback={<LoadingSpinner />}>
        <Show when={user().verified} fallback={<PleaseVerify user={user} />}>
          <div class="new-listing">
            <ListingForm
              listing={listingFormData()}
              page="new"
              heading={headings.newListing}
            />
          </div>
        </Show>
      </Show>
    </ServerError>
  )
}

export default NewListing
