import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import './LoginRegistration.css';


import {register} from "../../Services/Slice/auth";
import {clearMessage} from "../../Services/Slice/message";
import {useNavigate} from "react-router-dom";
import Loader from "../Loader/Loader";

const Register = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);

    const {message} = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .test(
                "len",
                "The firstname must be between 3 and 20 characters.",
                (val) =>
                    val && val.toString().length >= 3 && val.toString().length <= 20
            )
            .required("This field is required!"),
        email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),
        password: Yup.string()
            .test(
                "len",
                "The password must be between 6 and 40 characters.",
                (val) =>
                    val && val.toString().length >= 6 && val.toString().length <= 40
            )
            .required("This field is required!"),
    });

    const handleRegister = (formValue) => {
        const {firstname, lastname, email, password} = formValue;
        setLoading(true);
        setSuccessful(false);
        console.log("Register.jsx- RegisterClick")
        dispatch(register({firstname, lastname, email, password}))
            .unwrap()
            .then((response) => {
                if(response.messageType === "Success") {
                    setSuccessful(true);
                    navigate('/login')
                }
                else{
                    setSuccessful(false);
                    setLoading(false);
                }


            })
            .catch(() => {
                setSuccessful(false);
                setLoading(false);
            });
    };

    return (
        <>{loading ? <Loader/> :
            <div className="registerContainer col-md-12 signup-form">
                <div className="screen card card-container">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleRegister}
                    >
                        {({errors, touched}) => (
                            <Form>
                                {!successful && (
                                    <div>
                                        <div className="form-group">
                                            <i className="form__icon fas fa-user"></i>
                                            <label className="form__field" htmlFor="firstname">First Name</label>
                                            <Field
                                                name="firstname"
                                                type="text"
                                                className={
                                                    "form__input" +
                                                    (errors.firstname && touched.firstname
                                                        ? " is-invalid"
                                                        : "")
                                                }
                                            />
                                            <ErrorMessage
                                                name="firstname"
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <i className="form__icon fas fa-user"></i>
                                            <label className="form__field" htmlFor="lastname">Last Name</label>
                                            <Field
                                                name="lastname"
                                                type="text"
                                                className={
                                                    "form__input" +
                                                    (errors.lastname && touched.lastname
                                                        ? " is-invalid"
                                                        : "")
                                                }
                                            />
                                            <ErrorMessage
                                                name="lastname"
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                        </div>

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
                                                    (errors.password && touched.password
                                                        ? " is-invalid"
                                                        : "")
                                                }
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <button type="submit" className="button form__submit" id="register"
                                                    name="register">
                                                <span className="button__text">Register</span>
                                                <i className="button__icon fas fa-chevron-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Form>
                        )}
                    </Formik>
                    <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? Login here.
                    </button>
                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful ? "alert alert-success" : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        }</>
    );
};

export default Register;
