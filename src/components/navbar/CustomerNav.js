import { Link, useNavigate } from "react-router-dom"
// import "./NavBar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const CustomerNav = () => {
    const navigate = useNavigate()


    return (
        <>

            <Navbar variant="dark">
                <Container>

                    <Nav className="me-auto">
                        <Nav.Link href="/mygames">My Games</Nav.Link>
                        <Nav.Link href="/profile">My Profile</Nav.Link>
                        <Nav.Link href="/games">All Games</Nav.Link>
                        {
                            localStorage.getItem("gameStation_user")
                                ? <Nav.Link href="/" className="logout" onClick={() => {
                                    localStorage.removeItem("gameStation_user")
                                    navigate("/", { replace: true })
                                }}>
                                    Logout
                                </Nav.Link>
                                : ""
                        }
                    </Nav>
                </Container>
            </Navbar>

            <br />

        </>
    );
}


//             {
//                 localStorage.getItem("gameStation_user")
//                     ? <li className="navbar__item navbar__logout">
//                         <Link className="navbar__link" to="" onClick={() => {
//                             localStorage.removeItem("gameStation_user")
//                             navigate("/", { replace: true })
//                         }}>Logout</Link>
//                     </li>
//                     : ""
//             }
//         </ul>
//     )
// }

