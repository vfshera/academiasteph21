import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { useRouteMatch } from "react-router-dom";

import SideBar from "./SideBar";

//actions
import { authUserIn, authUserOut } from "../../actions/AuthUserActions";

const AdminLayout = (props) => {
    const dispatch = useDispatch();

    const authUserInAdmin = useSelector((state) => state.adminPanel);

    const { inAdminPanel, sidebarPosition } = authUserInAdmin;

    const linkForSidebar = [
        {
            name: "Orders",
            links: [
                {
                    name: "Received Orders",
                    url: `/in/dashboard/orders/received`,
                    access: "*",
                },
                {
                    name: "Pending Orders",
                    url: `/in/dashboard/orders/pending`,
                    access: "*",
                },
                {
                    name: "Unassigned Orders",
                    url: `/in/dashboard/orders/unassigned`,
                    access: "1",
                },
                {
                    name: "Cancelled Orders",
                    url: `/in/dashboard/orders/cancelled`,
                    access: "*",
                },
                {
                    name: "Active Orders",
                    url: `/in/dashboard/orders/active`,
                    access: "*",
                },

                {
                    name: "Completed Orders",
                    url: `/in/dashboard/orders/completed`,
                    access: "*",
                },
            ],
        },
        {
            name: "Writers",
            links: [
                {
                    name: "All Writers",
                    url: `/in/dashboard/writers`,
                    access: "0",
                },
            ],
        },
        {
            name: "Messages",
            links: [
                {
                    name: "Conversations",
                    url: `/in/dashboard/conversations`,
                    access: "1",
                },
                {
                    name: "Direct Contacts",
                    url: `/in/dashboard/direct-contacts`,
                    access: "1",
                },
            ],
        },
        {
            name: "Payment",
            links: [
                {
                    name: "Received",
                    url: `/in/dashboard/payments`,
                    access: "0",
                },
            ],
        },
        {
            name: "Control",
            links: [
                {
                    name: "Order Input",
                    url: "/in/dashboard/control/order-input",
                    access: "0",
                },
            ],
        },
        {
            name: "My Profile",
            links: [
                {
                    name: "Personal Information",
                    url: `/in/dashboard/profile`,
                    access: "*",
                },
            ],
        },
    ];

    useEffect(() => {
        // if(!inAdminPanel){
        dispatch(authUserIn());
        // }

        return () => {
            dispatch(authUserOut());
        };
    }, []);

    return (
        <>
            <div className="lg:hidden flex flex-col justify-center items-center">
                <img
                    src="/storage/images/desk_screen.svg"
                    className="mb-1"
                    alt=""
                />
                <span class="text-center text-xl font-bold">Ooops!</span>
                <span class="text-center text-sm">
                    Dashboard currently supports Desktop Screen Only
                </span>
            </div>

            <div className="backend-layout">
                <SideBar
                    className="sidebar_component"
                    isAdmin={true}
                    links={linkForSidebar}
                />
                <div className="dash_items_component">{props.children}</div>
            </div>
        </>
    );
};

export default AdminLayout;
