import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import ClientLayout from "../../components/client/ClientLayout";

//actions
import { logoutUser } from "../../actions/AuthUserActions";
import DotLoader from "../../components/DotLoader";

const Payment = () => {
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authClient = useSelector((state) => state.authClient);
    const { clientAuth } = authClient;

    const [orderPayments, setOrderPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMyPayments = () => {
        axios
            .get("/api/auth/client/order-payments")
            .then((response) => {
                setOrderPayments(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });

        setLoading(false);
    };

    const showOrder = (id, topic) => {
        let topicSlug = topic
            .trim()
            .replace(/[^a-zA-Z ]/g, " ")
            .replace(/\s/g, "-")
            .toLowerCase();

        navigate(`/client/dashboard/order-view/${id}/${topicSlug}`);
    };

    useEffect(() => {
        if (!clientAuth) {
            navigate("/client");
        }

        window.scrollTo(0, 0);

        document.querySelector("title").text =
            "AcademiaSteph21 | Client Payment";

        getMyPayments();
    }, [clientAuth]);

    return (
        <div className="dashboard">
            <ClientLayout>
                <div className="dash_overview">
                    <div className="payments-page">
                        <h1 className="lead-title">My Payments</h1>

                        <div className="payments-list">
                            <div className="payments-list-head">
                                <div className="payment-id">PAYMENT ID</div>

                                <div className="payment-order-id">ORDER ID</div>

                                <div className="payment-order-title">
                                    ORDER TITLE
                                </div>

                                <div className="payment-date">DATE</div>

                                <div className="payment-amount">AMOUNT($)</div>
                            </div>
                            <div className="payments-list-body">
                                {orderPayments.length == 0 && loading && (
                                    <DotLoader />
                                )}

                                {orderPayments.length != 0 &&
                                    orderPayments.map((orderPayment, index) => (
                                        <div
                                            className="payment-item"
                                            key={index}
                                        >
                                            <div className="payment-id">
                                                {
                                                    orderPayment.payment
                                                        .paypal_order_id
                                                }
                                            </div>

                                            <div className="payment-order-id">
                                                {orderPayment.payment.order_id}
                                            </div>

                                            <div
                                                className="payment-order-title"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    showOrder(
                                                        orderPayment.id,
                                                        orderPayment.topic
                                                    );
                                                }}
                                            >
                                                {orderPayment.topic.length > 50
                                                    ? orderPayment.topic.slice(
                                                          0,
                                                          50
                                                      ) + "..."
                                                    : orderPayment.topic}
                                            </div>

                                            <div className="payment-date">
                                                {
                                                    orderPayment.payment
                                                        .created_at
                                                }
                                            </div>

                                            <div className="payment-amount">
                                                ${orderPayment.payment.amount}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </ClientLayout>
        </div>
    );
};

export default Payment;
