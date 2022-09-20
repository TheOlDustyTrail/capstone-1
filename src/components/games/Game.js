import { render } from "@testing-library/react";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom"
import './Games.css';
export const Game = ({ gameName, gameType, currentUser, game, customer, gameImage, trailer }) => {

    const [added, setAdded] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const [show, setShow] = useState(true);


    const AddedButton = () => {

        if (show) {
            return (
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>You did it!</Alert.Heading>
                    <p>
                        {gameName} has been added to your favorites.
                    </p>
                </Alert>
            );
        }
    }

    const favoriteButton = () => {
        if (added) {
            return AddedButton()
        }
        return <Button
            size="sm"
            variant="success"
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
                            setAdded(true)
                        })

                }
            }
        >Add Favorite</Button>

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
        <div className="eachGame">
            <div className="info">
                <header>
                    {gameName}


                </header>
                <section className="category">{gameType}</section>

                <div className="imgTrailer"> <img src={gameImage} />

                </div>

                <div></div>
                {
                    currentUser.staff
                        ? <button onClick={() => navigate(`${game.id}/edit`)} >Edit</button>
                        :
                        location.pathname === "/games"
                            ? favoriteButton()
                            : <Button size="sm"
                                variant="danger" onClick={deleteButton} >Remove Game</Button>
                }
            </div>
            <iframe width="420" height="345" src={`${trailer}`} className="trailer"></iframe>
        </div>




    </>
}