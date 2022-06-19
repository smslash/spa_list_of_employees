import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();
    const [search, setSearch] = useState("");

    const history = useNavigate();

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveTab("Home");
        } else if (location.pathname === "/add") {
            setActiveTab("AddContact");
        } else if (location.pathname === "/about") {
            setActiveTab("About");
        }
    }, [location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        history(`/search?name=${search}`);
        setSearch("");
    };

    return (
        <div className="header">
            <div>
                <p className="logo">LIST OF EMPLOYEES</p>
                <div className="header-right">
                    <form onSubmit={handleSubmit} style={{ display: "inline" }}>
                        <input
                            type="text"
                            className="inputField"
                            placeholder="Search ..."
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                    </form>
                    <Link to="/">
                        <p
                            className={`${
                                activeTab === "Home" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("Home")}
                        >
                            HOME
                        </p>
                    </Link>
                    <Link to="/add">
                        <p
                            className={`${
                                activeTab === "AddContact" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("AddContact")}
                        >
                            ADD CONTACT
                        </p>
                    </Link>
                    <Link to="/about">
                        <p
                            className={`${
                                activeTab === "About" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("About")}
                        >
                            ABOUT
                        </p>
                    </Link>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default Header;
