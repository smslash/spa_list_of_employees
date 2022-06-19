import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { toast } from "react-toastify";

const initialState = {
    name: "",
    surname: "",
    patronymic: "",
    positon: "",
    email: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const { name, surname, patronymic, position, email } = state;

    const history = useNavigate();

    const { id } = useParams();

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
    }, [id]);

    useEffect(() => {
        if (id) {
            setState({ ...data[id] });
        } else {
            setState({ ...initialState });
        }

        return () => {
            setState({ ...initialState });
        };
    }, [id, data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !surname || !patronymic || !position || !email) {
            toast.error("Please provide value in each input field");
        } else {
            if (!id) {
                fireDb.child("contacts").push(state, (err) => {
                    if (err) {
                        toast.error(err);
                    } else {
                        toast.success("Contact Added Successfully");
                    }
                });
            } else {
                fireDb.child(`contacts/${id}`).set(state, (err) => {
                    if (err) {
                        toast.error(err);
                    } else {
                        toast.success("Contact Updated Successfully");
                    }
                });
            }

            setTimeout(() => history("/"), 500);
        }
    };

    return (
        <div style={{ marginTop: "100px" }}>
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center",
                }}
                onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter name ..."
                    value={name || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="surname">Surname</label>
                <input
                    type="text"
                    id="surname"
                    name="surname"
                    placeholder="Enter surname ..."
                    value={surname || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="name">Patronymic</label>
                <input
                    type="text"
                    id="patronymic"
                    name="patronymic"
                    placeholder="Enter patronymic ..."
                    value={patronymic || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="status">Position</label>
                <input
                    type="text"
                    id="position"
                    name="position"
                    placeholder="Enter position ..."
                    value={position || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter e-mail ..."
                    value={email || ""}
                    onChange={handleInputChange}
                />

                <input type="submit" value={id ? "Update" : "Save"} />
            </form>
        </div>
    );
};

export default AddEdit;
