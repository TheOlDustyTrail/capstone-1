import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import './Login.css';
export const Login = () => {
    const [email, set] = useState("Shane@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("gameStation_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    }))

                    navigate("/games")
                    window.location.reload(false);
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="bodyBackgroundDefault">
            <link href="http://fonts.cdnfonts.com/css/mark-squad" rel="stylesheet" />
            <style>
                @import url('http://fonts.cdnfonts.com/css/mark-squad');
            </style>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Game Station</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
            {

                <div className="wave">
                    <div className={`wave--oneDefault`}></div>
                    <div className={`wave--twoDefault`}></div>
                    <div className={`wave--threeDefault`}></div>
                </div>

            }
        </main>
    )
}

