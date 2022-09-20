
import { AdminNav } from "./AdminNav"
import { CustomerNav } from "./CustomerNav"

import "./NavBar.css"

export const NavBar = () => {
    const localGameStationUser = localStorage.getItem("gameStation_user")
    const gameStationUserObject = JSON.parse(localGameStationUser)
    if (gameStationUserObject.staff) {
        return <AdminNav />
    }
    else {
        return <CustomerNav />
    }
}
