import React, { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router";
import {
    useAcademicLevelsQuery,
    useSubjectAreasQuery,
    usePaperTypesQuery,
} from "../app/api/OrderAPI";

import { setAcademicLevels } from "../app/store/slices/AcademicLevelSlice";
import { setPaperTypes } from "../app/store/slices/PaperTypeSlice";
import { setSubjectAreas } from "../app/store/slices/SubjectAreaSlice";

const PriceCalculator = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { data: subjectAreas } = useSubjectAreasQuery();
    const { data: paperTypes } = usePaperTypesQuery();
    const { data: academicLevels } = useAcademicLevelsQuery();

    const essayTypeRef = useRef();
    const subAreaRef = useRef();
    const levelRef = useRef();
    const urgencyRef = useRef();
    const pagesRef = useRef();
    const essaySpacingRef = useRef();

    const AcademicLevels = useSelector((state) => state.academicLevels);
    const { allAcademicLevels } = AcademicLevels;

    const PaperTypes = useSelector((state) => state.paperTypes);
    const { allPaperTypes } = PaperTypes;

    const SubjectAreas = useSelector((state) => state.subjectAreas);
    const { allSubjectAreas } = SubjectAreas;

    const [paperAction, setPaperAction] = useState(0);

    const [orderPrice, setOrderPrice] = useState(0);

    const [pageNums, setPageNum] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

    const [pageWords, setPageWord] = useState({
        page: 1,
        words: 275,
    });

    const writeMyPaper = (e) => {
        e.preventDefault();
        navigate("/client/dashboard/place-order");
    };

    const checkCalcFields = () => {
        if (
            essayTypeRef.current.value !== "" &&
            essaySpacingRef.current.value !== "" &&
            pagesRef.current.value !== "" &&
            levelRef.current.value !== "" &&
            urgencyRef.current.value !== ""
        ) {
            let typeRate = parseFloat(essayTypeRef.current.value);
            let subjectRate = parseFloat(subAreaRef.current.value);
            let levelRate = parseFloat(levelRef.current.value);
            let urgencyVal = parseFloat(urgencyRef.current.value);
            let spacingVal = parseInt(essaySpacingRef.current.value, 10);
            let pagesVal = parseInt(pagesRef.current.value, 10);

            let multi = spacingVal * pagesVal;

            let rates = typeRate + levelRate + subjectRate;

            let orderSubTotal = multi * rates;

            let deduction = urgencyVal * 0.2;

            let serviceDeduction =
                paperAction == 1 ? 2 : paperAction == 2 ? 4 : 0;

            let totalDeduction =
                deduction > 0.6
                    ? 0.6 + serviceDeduction
                    : deduction + serviceDeduction;

            let orderTotal = ((urgencyVal) => 1)
                ? orderSubTotal - totalDeduction
                : orderSubTotal + totalDeduction;

            setOrderPrice(orderTotal);
        } else {
            setOrderPrice(0);
        }
    };

    useEffect(() => {
        checkCalcFields();
    }, [paperAction]);

    useEffect(() => {
        if (academicLevels) {
            dispatch(setAcademicLevels(academicLevels));
        }
    }, [academicLevels]);

    useEffect(() => {
        if (subjectAreas) {
            dispatch(setSubjectAreas(subjectAreas));
        }
    }, [subjectAreas]);

    useEffect(() => {
        if (paperTypes) {
            dispatch(setPaperTypes(paperTypes));
        }
    }, [paperTypes]);

    return (
        <div className="hidden price-calculator lg:block">
            <h1 className="text-2xl font-bold">Price Calculator</h1>
            <div className="calc-body">
                <div className="calc-tabs">
                    <span
                        className={paperAction == 0 ? "curr-tab" : "idle-tab"}
                        onClick={(e) => {
                            e.preventDefault();
                            setPaperAction(0);
                            checkCalcFields();
                        }}
                    >
                        Writing
                    </span>
                    <span
                        className={paperAction == 1 ? "curr-tab" : "idle-tab"}
                        onClick={(e) => {
                            e.preventDefault();
                            setPaperAction(1);
                            checkCalcFields();
                        }}
                    >
                        Rewriting
                    </span>
                    <span
                        className={paperAction == 2 ? "curr-tab" : "idle-tab"}
                        onClick={(e) => {
                            e.preventDefault();
                            setPaperAction(2);
                            checkCalcFields();
                        }}
                    >
                        Editing
                    </span>
                </div>
                <div className="mt-4 essay-type">
                    <select
                        name="essay-type"
                        id="essay-type"
                        className="w-full p-1"
                        ref={subAreaRef}
                        onChange={(e) => {
                            e.preventDefault();
                            checkCalcFields();
                        }}
                    >
                        <option value="" selected disabled>
                            Choose Essay Type
                        </option>

                        {allPaperTypes.map((papertype, index) => (
                            <option value={papertype.rate} key={index}>
                                {papertype.type_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-4 subject-area-select">
                    <select
                        name="essay-type"
                        id="essay-type"
                        className="w-full p-1"
                        ref={essayTypeRef}
                        onChange={(e) => {
                            e.preventDefault();
                            checkCalcFields();
                        }}
                    >
                        <option value="" selected disabled>
                            Choose Subject Area
                        </option>

                        {allSubjectAreas.map((subarea, index) => (
                            <option value={subarea.rate} key={index}>
                                {subarea.area_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-between mt-4 stage-time">
                    <select
                        name="stage"
                        id="stage"
                        className="w-45/100 p-1"
                        ref={levelRef}
                        onChange={(e) => {
                            e.preventDefault();
                            checkCalcFields();
                        }}
                    >
                        {allAcademicLevels.map((academiclevel, index) =>
                            academiclevel.level_name === "School" ? (
                                <option
                                    value={academiclevel.rate}
                                    selected
                                    key={index}
                                >
                                    {academiclevel.level_name}
                                </option>
                            ) : (
                                <option value={academiclevel.rate} key={index}>
                                    {academiclevel.level_name}
                                </option>
                            )
                        )}
                    </select>

                    <select
                        name="essay-time"
                        id="essay-time"
                        className="w-45/100 p-1"
                        ref={urgencyRef}
                        onChange={(e) => {
                            e.preventDefault();
                            checkCalcFields();
                        }}
                    >
                        <option value="0.25">6 Hours</option>
                        <option value="0.5">12 Hours</option>
                        <option value="1">1 Day</option>
                        <option value="2">2 Days</option>
                        <option value="3">3 Days</option>
                        <option value="5">5 Days</option>
                        <option value="7">7 Days</option>
                        <option value="10">10 Days</option>
                        <option value="14" selected>
                            2 Weeks
                        </option>
                        <option value="30">1 Month</option>
                        <option value="60">2 Months</option>
                    </select>
                </div>

                <div className="flex justify-center  mt-4 essay-pages ">
                    <input
                        type="number"
                        step="1"
                        min="1"
                        className="w-full text-center p-1 rounded"
                        ref={pagesRef}
                        onChange={(e) => {
                            e.preventDefault();
                            checkCalcFields();
                        }}
                        placeholder="Enter Number Of Pages..."
                    />
                </div>

                <div className="flex justify-center mt-4 essay-spacing">
                    <select
                        name="spacing"
                        id="spacing-input"
                        className="w-full text-center p-1 rounded"
                        ref={essaySpacingRef}
                        onChange={(e) => {
                            e.preventDefault();
                            checkCalcFields();
                        }}
                    >
                        <option value="" disabled>
                            Choose Spacing
                        </option>
                        <option value="1">Single Spacing</option>
                        <option value="2">Double Spacing</option>
                    </select>
                </div>

                <div className="flex justify-end px-3 mt-4 font-bold computed-price">
                    ${orderPrice}
                </div>

                <button
                    className="w-full py-3 mt-4 font-bold text-white rounded bg-primary-4"
                    onClick={writeMyPaper}
                >
                    Write My Paper
                </button>
            </div>
        </div>
    );
};

export default PriceCalculator;
