import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
export const AdminNav = () => {
    const navigate = useNavigate()

    return (
        <>

            <Navbar bg="primary" variant="dark">
                <Container>

                    <Nav className="me-auto">
                        <Nav.Link href="/createGame">Create Game</Nav.Link>

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

