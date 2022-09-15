import { Link, useNavigate } from "react-router-dom"
// import "./NavBar.css"

export const AdminNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/games">All Games</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/createGame">Create Game</Link>
            </li>


            {
                localStorage.getItem("gameStation_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("gameStation_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

