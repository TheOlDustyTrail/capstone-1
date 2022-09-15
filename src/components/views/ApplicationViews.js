import { AdminViews } from "./AdminViews"
import { CustomerViews } from "./CustomerViews"


export const ApplicationView = () => {
    const localGameStationUser = localStorage.getItem("gameStation_user")
    const gameStationUserObject = JSON.parse(localGameStationUser)

    if (gameStationUserObject.staff) {
        return <AdminViews />
    }
    else {
        return <CustomerViews />
    }
}