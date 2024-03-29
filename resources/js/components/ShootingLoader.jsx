import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

const ShootingLoader = ({ loading }) => {
    const AcademicLevels = useSelector((state) => state.academicLevels);
    const authClient = useSelector((state) => state.authClient);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(loading);
    }, [loading]);

    return (
        <>
            {isLoading && (
                <div className={!isLoading && "hidden"}>
                    <div className={`loader-overlay bg-white vh-100'}`}>
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
                </div>
            )}
        </>
    );
};

export default ShootingLoader;
