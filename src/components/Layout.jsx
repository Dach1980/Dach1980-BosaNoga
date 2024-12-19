// import React from "react";
import PropTypes from 'prop-types';
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => (
    <div>
        <Header />
        <main className="container">
            <div className="row">
                <div className="col">
                    <Banner />
                    {children}
                </div>
            </div>
        </main>
        <Footer />
    </div>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired, // Указываем, что children это обязательный пропс
};

export default Layout;