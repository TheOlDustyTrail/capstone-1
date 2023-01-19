import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const CreateGame = () => {
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


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const gameToSendToAPI = {
            name: game.name,
            categoriesId: game.categoriesId,
            image: game.image,
            trailer: game.trailer
        }

        return fetch(`http://localhost:8088/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gameToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/games")
            })
    }
    return (

        <form className="profile">

            <h2 className="profile__title">Create Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Name:</label>
                    <input
                        required
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
                        required
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
                        required
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
                    <label htmlFor="category">Category:</label>
                    <select type="number" key={`category--${category.id}`}
                        value={game.categoriesId}
                        onChange={
                            (evt) => {
                                const copy = { ...game }
                                copy.categoriesId = evt.target.value
                                update(copy)
                            }
                        } >
                        <option value={0}>Select a Category</option>
                        {category.map(categorie => {
                            return <option value={categorie.id} onChange={
                                (evt) => {
                                    const copy = { ...game }
                                    copy.categoriesId = evt.target.value
                                    update(copy)
                                }
                            } key={`category--${categorie.id}`} required> {categorie.name}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">

                Save New Game
            </button>
        </form>
    )

}