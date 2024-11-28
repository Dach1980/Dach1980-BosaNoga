// import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoriesListSelector } from "../../selectors";
import {setCategoryId, fetchProducts, fetchCategories} from "../../actions/actionCreators";
import Loader from "../Loader";
import Message from "../Message";

const Categories = () => {
  const dispatch = useDispatch();
  const { items, categoryId, loading, error } = useSelector(categoriesListSelector);
  const allItems = [{ title: 'Все', id: null }, ...items];

  const handleClick = (event, id) => {
    event.preventDefault();
    dispatch(setCategoryId(id));
    dispatch(fetchProducts(0));
  }

  if (loading) {
    return <Loader loading={loading} />
  }

  if (error) {
    return <Message type="error" message={error} callback={fetchCategories} />
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      {
        allItems.map((category) => (
          <li key={category.id} className="nav-item">
            <a
              className={`nav-link ${categoryId === category.id ? 'active' : ''}`}
              href="#"
              onClick={(event) => handleClick(event, category.id)}
            >
              {category.title}
            </a>
          </li>
        ))
      }
    </ul>
  )
}

export default Categories;
