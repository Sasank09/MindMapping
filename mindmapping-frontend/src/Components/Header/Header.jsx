import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiagramProject} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {logout} from "../../Services/Slice/auth";
import {useDispatch} from "react-redux";
import Loader from "../Loader/Loader";

const Header = () => {
    const navigate = useNavigate();
    const bool = localStorage.getItem("access_token") ? true : false
    const [auth, setAuth] = useState(bool)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        setAuth(bool)
    }, [bool])



    const handleLogout = () => {
        setLoading(true)
        navigate("/logout");
        dispatch(logout())
            .unwrap()
            .then(() => {
                setAuth(false);
                setTimeout(()=>{
                    setLoading(false)
                    navigate("/");
                },2500)

            })
            .catch(() => {
            });
    };

    const toLoginComponent = () => navigate('/login');
    const toRegisterComponent = () => navigate('/register');
    const handleDashboard = () => navigate('/userHome');

    return (<>
            {loading? <Loader/>:
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/" style={{"color": 'gold'}}>
                        <FontAwesomeIcon icon={faDiagramProject}/>Mind Mapping

                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >
                            {auth ?
                                <NavLink className="nav-link">Hello, Welcome!</NavLink>
                                :
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            }
                        </Nav>
                        {auth ? <span>
                        <Button variant="outline-info" className="me-2" onClick={handleDashboard}>Dashboard</Button>
                        <Button variant="danger" onClick={handleLogout}>Logout</Button>
                            </span>
                            :
                            <span>
                        <Button variant="outline-info" className="me-2" onClick={toLoginComponent}>Login</Button>
                        <Button variant="outline-info" onClick={toRegisterComponent}>Register</Button>
                            </span>
                        }

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            }
        </>
    )
}

export default Header