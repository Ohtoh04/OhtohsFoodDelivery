import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-dom/client";
import axios from "axios";

function DishUpdate(props) {
    const initialState = {
        name: "",
        description: "",
        price: "",
        restaurant: "",
        category: ""
    };

    const [dish, setDish] = useState(initialState);
    const [error, setError] = useState(null);

    const { id } = useParams(); // Fetch the dish ID from the URL params
    const navigate = useNavigate();

    // Fetch existing dish data to populate the form
    useEffect(() => {
        async function fetchDish() {
            try {
                const response = await axios.get(`/api/dishes/${id}`);
                setDish(response.data);
            } catch (error) {
                console.error("Error fetching dish data:", error);
                setError("Unable to load dish data. Please try again later.");
            }
        }
        fetchDish();
    }, [id]);

    function handleChange(event) {
        const { name, value } = event.target;
        setDish({ ...dish, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.put(`/api/dishes/${id}`, dish);
            navigate(`/dishes/${response.data.dish._id}`); // Navigate to the updated dish's details page
        } catch (error) {
            console.error("Error updating dish:", error);
            setError("Error updating dish. Please try again.");
        }
    }

    function handleCancel() {
        navigate("/dishes"); // Navigate back to the dishes list
    }

    return (
        <div className="container" style={{ maxWidth: "400px" }}>
            <h1>Update Dish</h1>
            <hr />
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        name="name"
                        type="text"
                        required
                        value={dish.name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        rows="3"
                        value={dish.description}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        name="price"
                        type="number"
                        step="0.01"
                        required
                        value={dish.price}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Restaurant</label>
                    <input
                        name="restaurant"
                        type="text"
                        required
                        value={dish.restaurant}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        name="category"
                        type="text"
                        value={dish.category}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="btn-group">
                    <input type="submit" value="Update" className="btn btn-primary" />
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DishUpdate;
