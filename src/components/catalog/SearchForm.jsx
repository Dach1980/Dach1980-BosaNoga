import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../actions/actionCreators";
import { productsListSelector } from "../../selectors";

const SearchForm = ({ isVisible }) => {
    const dispatch = useDispatch();
    const { query } = useSelector(productsListSelector);
    const [inputValue, setInputValue] = useState(query);

    if (!isVisible) {
        return null;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchProducts(inputValue));
    }

    return (
        <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
            <input
              className="form-control"
              placeholder="Поиск"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
        </form>
    )
}

export default SearchForm;
