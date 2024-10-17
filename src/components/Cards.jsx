import React from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import * as bootstrap from 'bootstrap'
import {
  fetchBestsellers,
  fetchProductsAndCategories, fetchProductsOnly,
} from "../actions/actionCreators.js";



const Cards = ({
    items, isCatalog, loading, error, categories
}) => {
    let location = useLocation();
    let currentLink = location.pathname === '/catalog' ? '/catalog' : '/catalog';
    return (
        <div>
            <div className="row">
                {
                    items.map((item) => (
                        <div className={`col-4 ${isCatalog ? 'catalog-item-card-wrapper' : ''}`} key={item.id} >
                            <div className={`card ${isCatalog ? 'catalog-item-card' : ''}`}>
                                <img
                                    src={item.images[0]}
                                    className="card-img-top img-fluid"
                                    alt={item.title}
                                />

                                <div className="card-body">
                                    <p className="card-text">{item.title}</p>
                                    <p className="card-text">{item.price} руб.</p>
                                    <Link
                                      to={`${currentLink}/${item.id}`}
                                      className="btn btn-outline-primary"
                                    >Заказать
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {categories && categories.length > 0
              ? <Message type="error" message={error} callback={isCatalog ? fetchProductsOnly : fetchBestsellers} />
              : <Message type="error" message={error} callback={isCatalog ? fetchProductsAndCategories : fetchBestsellers} />
            }
            <Loader loading={loading} />
        </div>
    )
};

export default Cards;
