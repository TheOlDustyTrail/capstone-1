import { useEffect, useState } from "react"
import { Game } from "../games/Game"

export const MyGames = () => {
    const localGameStationUser = localStorage.getItem("gameStation_user")
    const gameStationUserObject = JSON.parse(localGameStationUser)
    const [customerGames, setCustomerGames] = useState([])
    const [filteredCustomerGames, setFilteredCustomerGames] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customerGames?_expand=customer&_expand=game`)
                .then(response => response.json())
                .then((data) => {

                    setCustomerGames(data)
                })
        },
        []
    )
    useEffect(
        () => {
            const myGames = customerGames.filter(game => { return game.customer.userId === gameStationUserObject.id })

            setFilteredCustomerGames(myGames)
        },
        [customerGames]
    )
    const favoriteButton = () => {

        return ""
    }
    return <>

        <h2>My Games</h2>

        <article className="games">
            {

                filteredCustomerGames.map(
                    (game) => <Game
                        game={game}
                        currentUser={gameStationUserObject}
                        gameName={game.game.name}
                        customerId={game.customerId}
                        key={`game--${game.id}`}
                    />
                )
            }


        </article>
    </>
}