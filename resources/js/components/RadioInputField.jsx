import React from "react";

const RadioInputField = ({ labelText, inputName, id, onChange }) => {
    return (
        <div className="radio-group">
            <label className="text-lg font-semibold ">{labelText}</label>

            <label className="custom-check">
                <input
                    type="checkbox"
                    name={inputName}
                    id={id ?? ""}
                    onChange={onChange}
                />
                <span
                    className="checkmark"
                    style={{
                        backgroundImage: "url('/storage/images/checkmark.svg')",
                    }}
                ></span>
            </label>
        </div>
    );
};

export default RadioInputField;
