import { useEffect, useState } from "react"
import './profile.css';
export const Profile = () => {
    //display the name email and phone number for the customer to edit

    const localGameStationUser = localStorage.getItem("gameStation_user")
    const gameStationUserObject = JSON.parse(localGameStationUser)
    const [user, updateUser] = useState({
        name: "",
        email: ""

    })
    const [customer, updateCustomer] = useState({
        id: 0,
        userId: gameStationUserObject.id,
        phoneNumber: ""
    })

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
            fetch(`http://localhost:8088/users/${gameStationUserObject.id}`)
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
            isStaff: false
        }
        const employeeToSendToAPI = {
            id: customer.id,
            phoneNumber: customer.phoneNumber,
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

                fetch(`http://localhost:8088/customers/${customer.id}`,
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

        <form className="customer">

            <h2 className="customer__title">Edit Profile</h2>
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
                        value={customer.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = { ...customer }
                                copy.phoneNumber = evt.target.value
                                updateCustomer(copy)
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



    </>
}