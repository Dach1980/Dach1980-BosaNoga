import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
    {
        title: 'Главная',
        to: '/',
    },
    {
        title: 'Каталог',
        to: '/catalog',
    },
    {
        title: 'О магазине',
        to: '/about',
    },
    {
        title: 'Контакты',
        to: '/contacts',
    },
];

const NavBarMain = () => {
    const location = useLocation();

    return (
        <ul className="navbar-nav mr-auto">
            {
                links.map((link) => (
                    <li className="nav-item" key={link.title} >
                        <Link className={`nav-link ${location.pathname === link.to ? 'active-black' : ''}`} to={link.to}>
                            {link.title}
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
}

export default NavBarMain;
