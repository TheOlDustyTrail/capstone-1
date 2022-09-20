import { useEffect, useState } from "react"
import { Game } from "./Game"
import './Games.css';
export const Games = ({ searchTermState }) => {

    const localGameStationUser = localStorage.getItem("gameStation_user")
    const gameStationUserObject = JSON.parse(localGameStationUser)
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])
    const [customer, updateCustomer] = useState({
        id: 0,
        userId: gameStationUserObject.id,
        phoneNumber: ""
    })

    useEffect(
        () => {

            fetch(`http://localhost:8088/games?_expand=categories`)
                .then(response => response.json())
                .then((gameArray) => {
                    setGames(gameArray)
                })
        },
        []
    )
    useEffect(
        () => {

            fetch(`http://localhost:8088/games?_expand=categories`)
                .then(response => response.json())
                .then((gameArray) => {
                    setFilteredGames(gameArray)
                })
        },
        [games]
    )
    useEffect(
        () => {
            const searchedGames = games.filter(game => { return game.name.toLowerCase().startsWith(searchTermState.toLowerCase()) })

            setFilteredGames(searchedGames)
        },
        [searchTermState]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?userId=${gameStationUserObject.id}`)
                .then(response => response.json())
                .then((data) => {

                    updateCustomer(data[0])
                })
        },
        []
    )


    return <>

        <h2>All Games</h2>

        <article className="games">
            {

                filteredGames.map(
                    (game) => <Game
                        game={game}
                        trailer={game.trailer}
                        gameImage={game.image}
                        customer={customer}
                        currentUser={gameStationUserObject}
                        gameName={game.name}
                        gameType={game.categories.name}
                        key={`game--${game.id}`} />

                )
            }


        </article>
    </>
}
