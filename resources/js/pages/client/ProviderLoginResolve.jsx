import axios from "axios";
import React, { useEffect, useState } from "react";

import { loginClient } from "../../actions/AuthUserActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const ProviderLoginResolve = ({ location }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { provider } = useParams();

    const authClient = useSelector((state) => state.authClient);
    const { clientAuth } = authClient;

    const loginCallback = () => {
        const searchParams = new URLSearchParams(location.search);

        dispatch(loginClient({ code: searchParams.get("code") }, provider));
    };

    useEffect(() => {
        if (clientAuth) {
            location.state && location.state.next
                ? navigate(location.state.next)
                : navigate("/client/dashboard");
        }
    }, [clientAuth]);

    useEffect(() => {
        window.scrollTo(0, 0);

        document.querySelector("title").text =
            "AcademiaSteph21 | Login Redirect...";

        loginCallback();
    }, []);

    return (
        <div className="loader-overlay bg-white vh-100">
            <div className="wait-loader">
                <div className="center">
                    <img
                        src="/storage/images/as21logo.png"
                        alt="AcademiaSteph21 Loader"
                    />
                </div>
                <div className="item item-1"></div>
                <div className="item item-2"></div>
                <div className="item item-3"></div>
                <div className="item item-4"></div>
                <div className="item item-5"></div>
                <div className="item item-6"></div>
                <div className="item item-7"></div>
                <div className="item item-8"></div>
            </div>
        </div>
    );
};

export default ProviderLoginResolve;
