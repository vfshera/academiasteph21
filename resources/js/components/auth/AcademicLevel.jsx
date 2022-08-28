import axios from "axios";

import React, { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
    InputField,
    RadioInputField,
    TextAreaInputField,
    SelectInputField,
    FileInputField,
} from "../../config/FormElements";

import DotLoader from "../DotLoader";

import { useFormik } from "formik";

import * as Yup from "yup";

import { adminFetchAcademicLevels } from "../../actions/OrderActions";

const AcademicLevel = ({ themeClass }) => {
    const dispatch = useDispatch();

    const AcademicLevels = useSelector((state) => state.academicLevels);

    const { allAcademicLevels, loading, meta, links } = AcademicLevels;

    let [levelChange, setLevelChange] = useState(0);

    const [localLoad, setLocalLoad] = useState(false);

    const formik = useFormik({
        initialValues: {
            level_name: "",
            rate: 1,
            active: false,
        },
        validationSchema: Yup.object({
            level_name: Yup.string()
                .min(3, "Level Cannot Be Less Than 3 Characters")
                .max(32, "Level Cannot be More than 32 Characters")
                .required("Level is Required!"),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            addLevel(values);

            resetForm();

            setSubmitting(false);
        },
    });

    const deleteLevel = async (id) => {
        setLocalLoad(true);

        const res = await axios.delete("/api/auth/admin/academic-level/" + id);

        if (res.status == 200) {
            window.Toast.fire({
                icon: "success",
                title: res.data.message,
            });
        } else {
            window.Toast.fire({
                icon: "error",
                title: res.data.message,
            });
        }
        setLocalLoad(false);
        setLevelChange(Date.now());
    };

    const toggleStatus = (id) => {
        setLocalLoad(true);

        axios
            .post("/api/auth/admin/academic-level-toggle/" + id)
            .then((res) => {
                if (res.status == 200) {
                    window.Toast.fire({
                        icon: "success",
                        title: res.data.message,
                    });
                } else {
                    window.Swal.fire({
                        icon: "error",
                        title: res.data.message,
                    });
                }
            })
            .catch((error) => {
                window.Swal.fire({
                    icon: "error",
                    title: error,
                });
            });

        setLocalLoad(false);
        setLevelChange(Date.now());
    };

    const addLevel = async (levelForm) => {
        setLocalLoad(true);

        axios
            .post("/api/auth/admin/academic-level", levelForm)
            .then((res) => {
                if (res.status == 201) {
                    window.Toast.fire({
                        icon: "success",
                        title: res.data.message,
                    });
                } else {
                    window.Swal.fire({
                        icon: "error",
                        title: res.data.message,
                    });
                }
            })
            .catch((error) => {
                window.Swal.fire({
                    icon: "error",
                    title: error,
                });
            });

        setLocalLoad(false);
        setLevelChange(Date.now());
    };

    useEffect(() => {
        dispatch(adminFetchAcademicLevels());
    }, [levelChange]);

    return (
        <div className="table-group">
            <div className="core-table">
                <div className="core--list--table">
                    <div className="core--table--header">
                        <div className="table--item--split--name">LEVEL</div>

                        <div className="table--item--split--rate">RATE</div>

                        <div className="table--item--split--status">STATUS</div>
                    </div>

                    <div className="core--table--body">
                        {loading || localLoad ? (
                            <DotLoader />
                        ) : (
                            allAcademicLevels.map((academicLevel, index) => (
                                <div
                                    className={`table--item ${themeClass}`}
                                    key={index}
                                >
                                    <div className="table--item--split--name">
                                        {index + 1 + "."}{" "}
                                        {academicLevel.level_name}
                                    </div>

                                    <div className="table--item--split--rate">
                                        ${academicLevel.rate}
                                    </div>

                                    <div className="table--item--split--status">
                                        <span className="active-state">
                                            {academicLevel.active ? (
                                                <span>ACTIVE</span>
                                            ) : (
                                                <span>INACTIVE</span>
                                            )}
                                        </span>

                                        <span className="table--item--actions">
                                            <i
                                                className={`ti-exchange-vertical cursor-pointer ${
                                                    academicLevel.active
                                                        ? "text-palblue"
                                                        : "text-dark-1"
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleStatus(
                                                        academicLevel.id
                                                    );
                                                }}
                                            ></i>

                                            <svg
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    deleteLevel(
                                                        academicLevel.id
                                                    );
                                                }}
                                                className="h-6 cursor-pointer "
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                viewBox="0 0 32 32"
                                                fill="#FF0000"
                                            >
                                                <path
                                                    d="M14 4C13.477778 4 12.94539 4.1913289 12.568359 4.5683594C12.191329 4.9453899 12 5.4777778 12 6L12 7L7 7L6 7L6 9L7 9L7 25C7 26.645455 8.3545455 28 10 28L17 28L17 27.855469C18.367249 30.320181 20.996209 32 24 32C28.4 32 32 28.4 32 24C32 19.939374 28.931363 16.567445 25 16.070312L25 9L26 9L26 7L25 7L20 7L20 6C20 5.4777778 19.808671 4.9453899 19.431641 4.5683594C19.05461 4.1913289 18.522222 4 18 4L14 4 z M 14 6L18 6L18 7L14 7L14 6 z M 9 9L23 9L23 16.070312C22.301956 16.158582 21.631165 16.334117 21 16.591797L21 12L19 12L19 17.771484C18.18962 18.424016 17.507605 19.229482 17 20.144531L17 12L15 12L15 23L16.070312 23C16.028764 23.32857 16 23.660626 16 24C16 24.691044 16.098874 25.35927 16.265625 26L10 26C9.4454545 26 9 25.554545 9 25L9 9 z M 11 12L11 23L13 23L13 12L11 12 z M 24 18C27.3 18 30 20.7 30 24C30 27.3 27.3 30 24 30C20.7 30 18 27.3 18 24C18 20.7 20.7 18 24 18 z M 21.699219 20.300781L20.300781 21.699219L22.599609 24L20.300781 26.300781L21.699219 27.699219L24 25.400391L26.300781 27.699219L27.699219 26.300781L25.400391 24L27.699219 21.699219L26.300781 20.300781L24 22.599609L21.699219 20.300781 z"
                                                    fill="#FF0000"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}

                        {allAcademicLevels.length == 0 && !loading && (
                            <div className="no--table--items">
                                <h1>We Could'nt Find Any Levels!</h1>
                                <p>Please Try Adding More!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="new--table--item">
                <form action="" onSubmit={formik.handleSubmit}>
                    <InputField
                        labelText="Academic Level"
                        name="level_name"
                        type="text"
                        onBlur={formik.handleBlur}
                        value={formik.values.level_name}
                        placeholder="Academic Level"
                        onChange={formik.handleChange}
                        errors={
                            formik.errors.level_name &&
                            formik.touched.level_name &&
                            formik.errors.level_name
                        }
                    />

                    <InputField
                        labelText="Rate"
                        name="rate"
                        type="number"
                        onBlur={formik.handleBlur}
                        value={formik.values.rate}
                        placeholder="Enter rate..."
                        onChange={formik.handleChange}
                        errors={
                            formik.errors.rate &&
                            formik.touched.rate &&
                            formik.errors.rate
                        }
                    />

                    <div className="text-sm">
                        Default Academic Level Status is{" "}
                        <span className="text-gray-800 font-extrabold">
                            false
                        </span>
                    </div>

                    <button
                        type="submit"
                        className={`w-full mt-6 btn-add  font-bold ${themeClass}`}
                    >
                        {" "}
                        {localLoad ? "Adding" : "Add Level"}
                    </button>
                </form>
                <div className="table--links--meta">
                    <div className="meta--info">
                        Page
                        <span className="meta--info--value">
                            {meta.current_page} Of {meta.last_page}
                        </span>
                    </div>

                    <div className="meta--info">
                        Total Items
                        <span className="meta--info--value">{meta.total}</span>
                    </div>

                    <div className="links--fetch">
                        <button
                            className={
                                links.prev
                                    ? " bg-primary-3 text-white "
                                    : " bg-gray-100 text-gray-400 "
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                links.prev &&
                                    dispatch(
                                        adminFetchAcademicLevels(links.prev)
                                    );
                            }}
                        >
                            PREV
                        </button>

                        <button
                            className={
                                links.prev
                                    ? " bg-primary-3 text-white "
                                    : " bg-gray-100 text-gray-400 "
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                links.prev &&
                                    dispatch(
                                        adminFetchAcademicLevels(links.first)
                                    );
                            }}
                        >
                            FIRST
                        </button>

                        <button
                            className={
                                links.next
                                    ? " bg-primary-3 text-white "
                                    : " bg-gray-100 text-gray-400 "
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                links.next &&
                                    dispatch(
                                        adminFetchAcademicLevels(links.last)
                                    );
                            }}
                        >
                            LAST
                        </button>

                        <button
                            className={
                                links.next
                                    ? " bg-primary-3 text-white "
                                    : " bg-gray-100 text-gray-400 "
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                links.next &&
                                    dispatch(
                                        adminFetchAcademicLevels(links.next)
                                    );
                            }}
                        >
                            NEXT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicLevel;
