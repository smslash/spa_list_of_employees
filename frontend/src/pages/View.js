import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { useParams, Link } from "react-router-dom";
import "./View.css";

const View = () => {
    const [user, setUser] = useState({});

    const { id } = useParams();

    useEffect(() => {
        fireDb
            .child(`contacts/${id}`)
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setUser({ ...snapshot.val() });
                } else {
                    setUser({});
                }
            });
    }, [id]);

    console.log("user", user);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className="card">
                <div className="card-header">
                    <p>User Contact Detail</p>
                </div>
                <div className="container">
                    <br />
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Name: </strong>
                    <span>{user.name}</span>
                    <br />
                    <br />
                    <strong>Surname: </strong>
                    <span>{user.surname}</span>
                    <br />
                    <br />
                    <strong>Patronymic: </strong>
                    <span>{user.patronymic}</span>
                    <br />
                    <br />
                    <strong>Position: </strong>
                    <span>{user.position}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    <Link to="/">
                        <button className="btn btn-reset">Back</button>
                    </Link>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default View;
