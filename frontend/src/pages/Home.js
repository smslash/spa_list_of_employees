import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
    const [data, setData] = useState({});
    const [value, setValue] = useState("");
    const [sortedData, setSortedData] = useState([]);
    const [sort, setSort] = useState(false);

    useEffect(() => {
        fireDb.child("contacts").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({ ...snapshot.val() });
            } else {
                setData({});
            }
        });

        return () => {
            setData({});
        };
    }, []);

    const onDelete = (id) => {
        if (
            window.confirm(
                "Are you sure that you wanted to delete that contact ?"
            )
        ) {
            fireDb.child(`contacts/${id}`).remove((err) => {
                if (err) {
                    toast.error(err);
                } else {
                    toast.success("Contact Deleted Successfully");
                }
            });
        }
    };

    const handleChange = (e) => {
        setSort(true);
        fireDb
            .child("contacts")
            .orderByChild(`${e.target.value}`)
            .on("value", (snapshot) => {
                let sortedData = [];
                snapshot.forEach((snap) => {
                    sortedData.push(snap.val());
                });
                setSortedData(sortedData);
            });
    };

    const handleReset = () => {
        setSort(false);
        fireDb.child("contacts").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({ ...snapshot.val() });
            } else {
                setData({});
            }
        });
    };

    const filterData = (value) => {
        fireDb
            .child("contacts")
            .orderByChild("position")
            .equalTo(value)
            .on("value", (snapshot) => {
                if (snapshot.val()) {
                    const data = snapshot.val();
                    setData(data);
                }
            });
    };

    return (
        <div style={{ marginTop: "40px" }}>
            <label style={{ marginRight: "4px" }}>Sort By:</label>
            <select
                className="dropdown"
                name="colValue"
                onChange={handleChange}
            >
                <option>Select</option>
                <option value="name">Name</option>
                <option value="surname">Surname</option>
                <option value="patronymic">Patronymic</option>
                <option value="position">Position</option>
                <option value="email">Email</option>
            </select>
            <button className="btn btn-reset" onClick={handleReset}>
                Reset
            </button>
            <br />
            <br />
            <label style={{ marginRight: "7px" }}>Filter:</label>
            <button
                className="btn btn-filter"
                onClick={() => filterData("Front-End Developer")}
            >
                Front-End
            </button>
            <button
                className="btn btn-filter"
                onClick={() => filterData("Back-End Developer")}
            >
                Back-End
            </button>
            <button
                className="btn btn-filter"
                onClick={() => filterData("Project Manager")}
            >
                Project Manager
            </button>
            <button
                className="btn btn-filter"
                onClick={() => filterData("HR Manager")}
            >
                HR Manager
            </button>
            <table
                className="styled-table"
                style={{ marginTop: "40px", marginBottom: "100px" }}
            >
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Surname</th>
                        <th style={{ textAlign: "center" }}>Patronymic</th>
                        <th style={{ textAlign: "center" }}>Position</th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        {!sort && (
                            <th style={{ textAlign: "center", width: "150px" }}>
                                Action
                            </th>
                        )}
                    </tr>
                </thead>
                {!sort && (
                    <tbody>
                        {Object.keys(data).map((id, index) => {
                            return (
                                <tr key={id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data[id].name}</td>
                                    <td>{data[id].surname}</td>
                                    <td>{data[id].patronymic}</td>
                                    <td>{data[id].position}</td>
                                    <td>{data[id].email}</td>
                                    <td>
                                        <Link to={`/update/${id}`}>
                                            <button className="btn btn-edit">
                                                Edit
                                            </button>
                                        </Link>
                                        <Link to={`/view/${id}`}>
                                            <button className="btn btn-view">
                                                View
                                            </button>
                                        </Link>
                                        <button
                                            className="btn btn-delete"
                                            onClick={() => onDelete(id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                )}
                {sort && (
                    <tbody>
                        {sortedData.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.surname}</td>
                                    <td>{item.patronymic}</td>
                                    <td>{item.position}</td>
                                    <td>{item.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default Home;
