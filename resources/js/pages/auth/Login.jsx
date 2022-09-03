import axios from "axios";
import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//actions
import { loginUser, refreshUser } from "../../actions/AuthUserActions";
import LogoShooting from "../../components/LogoShooting";

const Login = ({ location }) => {
    const [isLoggin, setIsLogging] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authUser = useSelector((state) => state.authUser);
    const { loggedInUser, auth, loading } = authUser;

    useEffect(() => {
        if (auth) {
            location.state && location.state.next
                ? navigate(location.state.next)
                : navigate("/in/dashboard");
        }
    }, [auth]);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleLogin = (e) => {
        e.preventDefault();

        setIsLogging(true);

        dispatch(loginUser(user));

        setIsLogging(false);
    };

    const noAccount = (e) => {
        e.preventDefault();

        navigate("/in/register");
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        document.querySelector("title").text = "AcademiaSteph21 | Admin Login";
    }, []);
    return (
        <div className="login-screen">
            <form
                className="w-11/12 md:w-4/5 lg:w-2/5 bg-white p-10 sm:p-14 shadow-sm rounded-lg"
                onSubmit={handleLogin}
            >
                <label className="w-full mb-5 text-3xl font-bold sm:text-4xl text-center">
                    Admin Login
                </label>
                {loading && <LogoShooting></LogoShooting>}

                <InputField
                    labelText="Username"
                    parentClasses="w-full"
                    name="username"
                    id="username"
                    type="text"
                    placeholder="Enter Email"
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />

                <InputField
                    labelText="Password"
                    parentClasses="w-full"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter  Password"
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                />

                {/*<label className="block">Don't Have An Account? <span className="ml-2 font-bold cursor-pointer text-primary-3" onClick={noAccount}>Register Here</span></label>*/}
                <button
                    type="submit"
                    className="w-full sm:text-2xl font-bold sm:w-1/2 lg:w-1/3 btn-pri"
                >
                    {isLoggin ? "Logging In" : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;