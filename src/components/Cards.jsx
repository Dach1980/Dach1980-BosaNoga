// import React from "react";
import PropTypes from 'prop-types';
import { Link, useLocation } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
// import * as bootstrap from 'bootstrap'
import {
    fetchBestsellers,
    fetchProductsAndCategories, 
    fetchProductsOnly,
} from "../actions/actionCreators.js";



const Cards = ({
    items, isCatalog, loading, error, categories
}) => {
    let location = useLocation();
    let currentLink = location.pathname === '/catalog' ? '/catalog' : '/catalog';

    if (loading) {
        return <Loader loading={loading} />;
    }

    if (error) {
        return <Message type="error" message={error} />;
    }

    return (
        <div>
            <div className="row">
                {items && items.length > 0 ? (
                    items.map((item) => (
                        <div className={`col-4 ${isCatalog ? 'catalog-item-card-wrapper' : ''}`} key={item.id}>
                            <div className={`card ${isCatalog ? 'catalog-item-card' : ''}`}>
                                <img
                                    src={item.images.length > 0 ? item.images[0] : 'default-image.jpg'}
                                    className="card-img-top img-fluid"
                                    alt={item.title}
                                />
                                <div className="card-body">
                                    <p className="card-text">{item.title}</p>
                                    <p className="card-text">{item.price} руб.</p>
                                    <Link
                                        to={`${currentLink}/${item.id}`}
                                        className="btn btn-outline-primary"
                                    >
                                        Заказать
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Нет доступных товаров.</p>
                )}
            </div>
            {categories && categories.length > 0 ? (
                <Message type="error" message={error} callback={isCatalog ? fetchProductsOnly : fetchBestsellers} />
            ) : (
                <Message type="error" message={error} callback={isCatalog ? fetchProductsAndCategories : fetchBestsellers} />
            )}
        </div>
    );
};

Cards.propTypes = {
    items: PropTypes.array.isRequired, // Убедитесь, что items - массив и обязательный
    isCatalog: PropTypes.bool.isRequired, // isCatalog - булевый тип и обязательный
    loading: PropTypes.bool.isRequired, // loading - булевый тип и обязательный
    error: PropTypes.string, // error - строковый тип, но не обязательный
    categories: PropTypes.array // categories - массив, но не обязательный
};

export default Cards;
