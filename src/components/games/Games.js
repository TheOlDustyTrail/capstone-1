import { useEffect, useState } from "react"
import { Game } from "./Game"

export const Games = ({ searchTermState }) => {

    const localGameStationUser = localStorage.getItem("gameStation_user")
    const gameStationUserObject = JSON.parse(localGameStationUser)
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])

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

    return <>

        <h2>List of Games</h2>

        <article className="games">
            {

                filteredGames.map(
                    (game) => <Game
                        game={game}
                        currentUser={gameStationUserObject}
                        gameName={game.name}
                        gameType={game.categories.name}
                        key={`game--${game.id}`} />
                )
            }


        </article>
    </>
}
