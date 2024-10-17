import React from "react";
import {useDispatch} from "react-redux";


const Message = ({ type, message, callback, productId, navigate }) => {
    const handleClick = () => {
      if (callback) {
        productId ? dispatch(callback(navigate, productId)) : dispatch(callback())
      }
    }
    const dispatch = useDispatch();
    if (!message) return null;
    if (type === 'error') {
      return (
        <p className={`'message' ${type}`}>
            {message}&nbsp;
            {callback && <button
              onClick={handleClick}
              className="btn btn-outline-warning btn-sm"
            >
              Попробовать ещё раз
            </button>}
        </p>
      );
    } else {
        return (
          <p className={`'message' ${type}`}>{message}</p>
        );
    }

};


export default Message;
