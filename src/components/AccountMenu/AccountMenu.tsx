import { For } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { logout } from "../../utils/utils"
import routes from "../../utils/client-routes"
import "./AccountMenu.scss"

const AccountMenu = props => {
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate(routes.discover)
  }

  const accountMenuItems = [
    {
      name: "account",
      route: routes.account,
    },
    {
      name: "log out",
      action: handleLogout,
    },
  ]

  return (
    <div class="account-menu" onclick={() => props.setShowMenu(false)}>
      <nav class="account-menu__nav">
        <For each={accountMenuItems}>
          {item => (
            <li
              class="account-menu__item"
              onclick={() =>
                item.route ? navigate(item.route) : item.action()
              }>
              {item.name}
            </li>
          )}
        </For>
      </nav>
    </div>
  )
}

export default AccountMenu
