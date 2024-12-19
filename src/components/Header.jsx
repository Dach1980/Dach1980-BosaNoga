import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../actions/actionCreators";
import { cartItemsSelector } from "../selectors";
import NavBarMain from "./NavBarMain";
import headerLogo from "../img/header-logo.png"

const Header = () => {
    const dispatch = useDispatch();
    const { cartItemsCount } = useSelector(cartItemsSelector);
    const navigate = useNavigate();
    const [searchInvisible, setSearchInvisible] = useState(true);
    const [inputValue, setInputValue] = useState('');

    const handleCartClick = () => {
        navigate('/cart');
    }

    const handleSearchClick = () => {
        if (!inputValue) {
            setSearchInvisible((prevstate) => !prevstate)
            return;
        }

        dispatch(searchProducts(inputValue));
        setInputValue('');
        setSearchInvisible(true);
        navigate('/catalog');
    }

    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <NavLink className="navbar-brand" to="/">
                            <img src={headerLogo} alt="Bosa Noga" />
                        </NavLink>
                        <div className="collapase navbar-collapse" id="navbarMain">
                            <NavBarMain />
                            <div>
                                <div className="header-controls-pics">
                                    <div
                                        data-id="search-expander"
                                        className="header-controls-pic header-controls-search"
                                        onClick={handleSearchClick}
                                    />
                                    <form
                                        data-id="search-form"
                                        className={`header-controls-search-form form-inline ${searchInvisible ? 'invisible' : ''}`}
                                        onSubmit={(event) => event.preventDefault()}
                                    >
                                        <input
                                            className="form-control"
                                            placeholder="Поиск"
                                            value={inputValue}
                                            onChange={(event) => setInputValue(event.target.value)}
                                        />
                                    </form>
                                    <div
                                        className="header-controls-pic header-controls-cart"
                                        onClick={handleCartClick}
                                    >
                                        {cartItemsCount ? (
                                            <div className="header-controls-cart-full">
                                                {cartItemsCount}
                                            </div>
                                        ) : null}
                                        <div className="header-controls-cart-menu" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;
