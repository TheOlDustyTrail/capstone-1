import { useEffect, useState } from "react"

export const Profile = () => {
    //display the name email and phone number for the customer to edit

    const localGameStationUser = localStorage.getItem("gameStation_user")
    const gameStationUserObject = JSON.parse(localGameStationUser)
    const [user, updateUser] = useState({
        name: "",
        email: ""

    })
    const [profile, updateProfile] = useState({
        id: 0,
        userId: gameStationUserObject.id,
        phoneNumber: ""
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?userId=${gameStationUserObject.id}`)
                .then(response => response.json())
                .then((data) => {

                    updateProfile(data)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?id=${gameStationUserObject.id}`)
                .then(response => response.json())
                .then((data) => {

                    updateUser(data)
                })
        },
        []
    )
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const userToSendToAPI = {
            name: user.name,
            email: user.email,
            isStaff: true
        }
        const employeeToSendToAPI = {
            id: profile.id,
            phoneNumber: profile.phoneNumber,
            userId: user.id

        }

        return fetch(`http://localhost:8088/users/${gameStationUserObject.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(userToSendToAPI)

            })
            .then(response => response.json())
            .then((parsedresponse) => {
                employeeToSendToAPI.userId = parsedresponse.id

                fetch(`http://localhost:8088/customers/${employeeToSendToAPI.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(employeeToSendToAPI)

                    })
                    .then(response => response.json())
            })

    }


    return <>
        (
        <form className="profile">

            <h2 className="profile__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user.name}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.name = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"

                        value={user.email}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.email = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Phone Number:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        )


    </>
}