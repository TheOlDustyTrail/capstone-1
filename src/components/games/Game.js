import { Link, useLocation, useNavigate } from "react-router-dom"

export const Game = ({ gameName, gameType, currentUser, game, customer }) => {

    const navigate = useNavigate()
    const location = useLocation()
    const favoriteButton = () => {
        return <button
            onClick={
                () => {
                    fetch(`http://localhost:8088/customerGames`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            gameId: game.id,
                            customerId: customer.id

                        })
                    })
                        .then(response => response.json())
                        .then(() => {
                            navigate(`/mygames`)
                        })
                }
            }
        >Add Favorite</button>
    }
    const deleteButton = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/customerGames/${game.id}`, {
            method: "DELETE",
        })
            .then(() => {
                window.location.reload(false);
            })
    }
    return <>
        <header>
            {gameName}
            {
                currentUser.staff
                    ? <button onClick={() => navigate(`${game.id}/edit`)} >Edit</button>
                    :
                    location.pathname === "/games"
                        ? favoriteButton()
                        : <button onClick={deleteButton} >Remove Game</button>
            }
        </header>
        <section>{gameType}</section>

    </>
}