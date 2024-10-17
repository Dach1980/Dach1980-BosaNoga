import React from "react";

const Loader = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="preloader">
            <span />
            <span />
            <span />
            <span />
        </div>
    );
};

export default Loader;