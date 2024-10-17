import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
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

const NavFooter = () => {
    const location = useLocation();

    return (
        <ul className="nav flex-column">
            {
                links.map((link) => (
                    <li className="nav-item" key={link.title}>
                        <Link className={`nav-link ${location.pathname === link.to ? 'active-black' : ''}`} to={link.to}>
                            {link.title}
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
}

export default NavFooter;