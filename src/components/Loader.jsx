// import React from "react";
import PropTypes from 'prop-types';

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

// Добавляем валидацию пропсов
Loader.propTypes = {
    loading: PropTypes.bool.isRequired, // Указываем, что loading это обязательный булевый пропс
};

export default Loader;