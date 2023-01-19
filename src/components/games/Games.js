import { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { Game } from "./Game"
import './Games.css';
export const Games = ({ searchTermState }) => {

    const localGameStationUser = localStorage.getItem("gameStation_user")
    const gameStationUserObject = JSON.parse(localGameStationUser)
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])
    const [category, setCategory] = useState([])
    const [selected, setSelected] = useState(false)

    const [categorySelected, setCategorySelected] = useState({ id: 0 })
    const [customer, updateCustomer] = useState({
        id: 0,
        userId: gameStationUserObject.id,
        phoneNumber: ""
    })


    useEffect(() => {
        fetch(`http://localhost:8088/categories`)
            .then(response => response.json())
            .then((data) => {
                setCategory(data)
            })
    }, [])

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
    useEffect(
        () => {
            console.log(categorySelected)
            const searchedGames = games.filter(game => { return game.categoriesId === categorySelected.id })

            setFilteredGames(searchedGames)

            setSelected(false)
        },
        [selected]
    )
    const refresh = () => {
        return window.location.reload(false);
    }


    return <>

        <h2>All Games</h2>

        <article className="games">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Category:</label>
                    <select type="number" key={`category--${category.id}`}

                        onChange={
                            (evt) => {
                                setSelected(true)
                                const copy = { ...categorySelected }
                                copy.id = evt.target.value
                                setCategorySelected(copy)
                            }
                        } >
                        <option value={0}>Select a Category</option>
                        {category.map(categorie => {
                            return <option value={categorie.id} onChange={
                                (evt) => {
                                    const copy = { ...categorySelected }
                                    copy.id = evt.target.value
                                    setCategorySelected(copy)
                                }
                            } key={`category--${categorie.id}`}> {categorie.name}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <Button size="sm"
                variant="info" onClick={refresh} >All games</Button>
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



