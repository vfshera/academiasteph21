import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import ClientLayout from "../../components/client/ClientLayout";

const Profile = () => {
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authClient = useSelector((state) => state.authClient);
    const { clientAuth, loggedInClient } = authClient;

    useEffect(() => {
        if (!clientAuth) {
            navigate("/client");
        }

        window.scrollTo(0, 0);

        document.querySelector("title").text =
            "AcademiaSteph21 | Client Profile";
    }, [clientAuth]);

    return (
        <div className="dashboard bg-gray-100">
            <ClientLayout>
                <div className="dash_overview">
                    <div className="profile">
                        <h1 className="lead-title">Profile Page</h1>
                        <div className="profile-hub">
                            <div className="profile-primary-details">
                                <h2>Primary Details</h2>

                                <div className="profile-detail">
                                    <label>Name</label>
                                    <span>{loggedInClient.name}</span>
                                </div>

                                <div className="profile-detail">
                                    <label>Email</label>
                                    <span>{loggedInClient.email}</span>
                                </div>

                                <div className="profile-detail">
                                    <label>Joined</label>
                                    <span>{loggedInClient.created_at}</span>
                                </div>
                            </div>

                            <div className="profile-sec-details">
                                <h2 className="mb-3">Social Accounts</h2>

                                {loggedInClient.social_accounts.length == 0 && (
                                    <>
                                        <div className="no-social-account text-red-500">
                                            No Social Accounts Linked to
                                            <span className="text-sm text-gray-600 px-2 py-1 rounded ml-2 bg-blue-100">
                                                {loggedInClient.email}
                                            </span>
                                        </div>
                                    </>
                                )}

                                {loggedInClient.social_accounts.map(
                                    (socialAccount) => (
                                        <div
                                            className={`profile-detail  bg-${socialAccount.provider}-1 p-3`}
                                        >
                                            <div className="icon-label-provider">
                                                <i
                                                    className={`ti-${socialAccount.provider}  text-${socialAccount.provider}-1  bg-white p-2 rounded-full`}
                                                ></i>
                                                <label>
                                                    {socialAccount.provider}
                                                </label>
                                            </div>
                                            <div className="provider-date-time">
                                                <span>
                                                    {socialAccount.created_date}
                                                </span>
                                                <span className="mr-3">
                                                    {socialAccount.created_time}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ClientLayout>
        </div>
    );
};

export default Profile;
