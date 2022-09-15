import { Link, useNavigate } from "react-router-dom"

export const Game = ({ gameName, gameType, currentUser, game }) => {

    const navigate = useNavigate()

    return <>
        <header>
            {gameName}
            {
                currentUser.staff
                    ? <button onClick={() => navigate(`${game.id}/edit`)} >Edit</button>
                    : <button>Add</button>
            }
        </header>
        <section>{gameType}</section>

    </>
}