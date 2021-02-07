import React from "react";
import "./styles.scss";


const ErrorMesssage = ({ borderClass, message }) => {
    return (
        <div className={`${borderClass}`}>
            <div className= "error-msg">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ErrorMesssage;
