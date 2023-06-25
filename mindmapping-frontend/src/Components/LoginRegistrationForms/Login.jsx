import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";

import {login} from "../../Services/Slice/auth";
import {clearMessage} from "../../Services/Slice/message";
import Loader from "../Loader/Loader";

const Login = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {message} = useSelector((state) => state.message);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);


    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("This field is required!"),
        password: Yup.string().required("This field is required!"),
    });

    const runLogoutTimer = (time) => {
        setTimeout(()=>{
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            navigate('/')
        },time);
    }
    const handleLogin = (formValue) => {
        console.log("Login.jsx- LoginClick")
        const {email, password} = formValue;
        setLoading(true);
        dispatch(login({email, password}))
            .unwrap()
            .then(() => {
                runLogoutTimer(1000*60*60*24);
                navigate("/userHome");
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <>{loading ? <Loader/> :
            <div className="loginContainer col-md-12 login-form">
                <div className="screen card card-container">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        {({errors, touched}) => (
                            <Form className="login">
                                <div className="form-group">
                                    <i className="form__icon fas fa-envelope"></i>
                                    <label className="form__field" htmlFor="email">Email</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className={
                                            "form__input" +
                                            (errors.email && touched.email ? " is-invalid" : "")
                                        }
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group">
                                    <i className="form__icon fas fa-lock"></i>
                                    <label className="form__field" htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={
                                            "form__input" +
                                            (errors.password && touched.password ? " is-invalid" : "")
                                        }
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="form__submit" name="loginBtn" disabled={loading}>
                                        <span className="button__text">Log In</span>
                                        <i className="button__icon fas fa-chevron-right"></i>
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register
                        here.
                    </button>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        }</>
    );
};

export default Login;