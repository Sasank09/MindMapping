import './App.css';
import Layout from './Components/Layout';
import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import NotFound from './Components/NotFound/NotFound';
import Login from "./Components/LoginRegistrationForms/Login";
import Logout from "./Components/LoginRegistrationForms/Logout";
import Register from "./Components/LoginRegistrationForms/Register";
import UserDashboard from "./Components/UserPages/UserDashboard";
import MindMapFlow from "./Components/UserPages/MindMapPage"

function App() {
    const isAuthenticated = false
    const ProtectedRoute = ({
                                isAuthenticated,
                                redirectPath = '/login',
                                children,
                            }) => {
        isAuthenticated = localStorage.getItem("access_token") ? true : false;
        if (isAuthenticated===false) {
            return <Navigate to={redirectPath} replace />;
        }

        return children ? children : <Outlet />;
    };

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Home/>} ></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                    <Route path="/logout" element={<Logout/>}></Route>
                    <Route path="*" element = {<NotFound/>}></Route>
                    <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                        <Route path="/userHome" element={<UserDashboard/>}></Route>
                        <Route path="/mindmap/new" element={<MindMapFlow/>}></Route>
                        <Route path="/mindmap/update" element={<MindMapFlow/>}></Route>
                    </Route>


                </Route>
            </Routes>

        </div>
    );
}

export default App;