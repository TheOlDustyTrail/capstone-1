import { AdminViews } from "./AdminViews"
import { CustomerViews } from "./CustomerViews"
import './Views.css';

export const ApplicationView = () => {
    const localGameStationUser = localStorage.getItem("gameStation_user")
    const gameStationUserObject = JSON.parse(localGameStationUser)

    if (gameStationUserObject.staff) {
        return <article>

            <AdminViews />
        </article>

    }
    else {
        return <article><CustomerViews /></article>
    }
}