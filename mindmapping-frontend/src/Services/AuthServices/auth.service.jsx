import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

const register = (firstname, lastname, email, password) => {
    return axios.post(API_URL + "register", {
        firstname,
        lastname,
        email,
        password,
    }).then((response) => {
        console.log("REGISTER RESPONSE",response)
        return response;
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "authenticate", {
            email,
            password,
        })
        .then((response) => {
            console.log("LOGIN RESPONSE",response)
            if (response.data.access_token) {
                localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("access_token");
        return "Logout Successful";
};


const AuthService = {
    register,
    login,
    logout,
}

export default AuthService;