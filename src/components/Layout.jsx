import React from "react";
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

export default Layout;