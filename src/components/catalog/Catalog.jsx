import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { categoriesListSelector, productsListSelector } from "../../selectors";
import { fetchProducts, setSearchValue, setCategoryId, fetchCategories } from "../../actions/actionCreators";
import Cards from "../Cards";
import Loader from "../Loader";
import Categories from "./Categories";
import LoadMoreBtn from "./LoadMoreBtn";
import SearchForm from "./SearchForm";

const Catalog = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { items, loading: cardsLoading, error } = useSelector(productsListSelector);
    const { items: categories, loading: categoriesLoading } = useSelector(categoriesListSelector);
    const isCatalog = location.pathname === '/catalog';

    useEffect(() => {
        dispatch(fetchCategories());
        if (!cardsLoading) {
            dispatch(fetchProducts(0));
        }

        return () => {
            if (isCatalog) {
                dispatch(setSearchValue(''));
            }
            dispatch(setCategoryId(null));
        }
    }, []);

    const catalogLoading = cardsLoading && categoriesLoading;

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <SearchForm isVisible={isCatalog} />
            {
                !catalogLoading
                && (
                    <div>
                        <Categories />
                        <Cards loading={cardsLoading} error={error} items={items} isCatalog categories={categories}/>
                        <LoadMoreBtn items={items} />
                    </div>
                )
            }
            <Loader loading={catalogLoading} />
        </section>
    );
}

export default Catalog;
