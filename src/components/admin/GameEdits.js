import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

export const GameEdits = () => {
    const [game, update] = useState([])
    const navigate = useNavigate()
    const [category, setCategory] = useState([])
    const { gameId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/categories`)
            .then(response => response.json())
            .then((data) => {
                setCategory(data)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/games/${gameId}`)
            .then(response => response.json())
            .then((employeeArray) => {
                update(employeeArray)
            })
    }, [gameId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/games/${game.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/games")
            })
    }
    const DeleteButton = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/games/${game.id}`, {
            method: "DELETE",
        })
            .then(() => {
                navigate("/games")
            })
    }


    return (

        <form className="profile">

            <h2 className="profile__title">Edit Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={game.name}
                        onChange={
                            (evt) => {
                                const copy = { ...game }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Photo URL:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={game.image}
                        onChange={
                            (evt) => {
                                const copy = { ...game }
                                copy.image = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Trailer URL:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={game.trailer}
                        onChange={
                            (evt) => {
                                const copy = { ...game }
                                copy.trailer = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Category:</label>
                    <select type="number" key={`category--${category.id}`}
                        value={game.categoriesId}
                        onChange={
                            (evt) => {
                                const copy = { ...game }
                                copy.categoriesId = evt.target.value
                                update(copy)
                            }
                        } >
                        {category.map(categorie => {
                            return <option value={categorie.id} onChange={
                                (evt) => {
                                    const copy = { ...game }
                                    copy.categoriesId = evt.target.value
                                    update(copy)
                                }
                            } key={`category--${categorie.id}`}> {categorie.name}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <Button
                variant="outline-warning"
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">

                Save Game Edit
            </Button>
            <Button
                variant="outline-danger"
                onClick={(clickEvent) => DeleteButton(clickEvent)}
                className="btn btn-info">

                Delete Game
            </Button>
        </form>
    )

}