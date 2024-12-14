import React, { useState, useEffect } from 'react';
import { Link } from "react-router";
import axios from 'axios';
import '../style.css'; // Import the CSS

const DishList = () => {
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({ name: '', description: '', price: '' });
    const [editDish, setEditDish] = useState(null);

    useEffect(() => {
        fetchDishes();
    }, []);

    const fetchDishes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/dishes/');
            console.log(response);
            setDishes(response.data);

        } catch (error) {
            console.error('Error fetching dishes:', error);
        }

    };

    const handleUpdateDish = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/dishes/${editDish._id}`, editDish);
            setDishes(dishes.map(d => (d._id === response.data.dish._id ? response.data.dish : d)));
            setEditDish(null);
        } catch (error) {
            console.error('Error updating dish:', error);
        }
    };

    const handleDeleteDish = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/dishes/${id}`);
            setDishes(dishes.filter(d => d._id !== id));
        } catch (error) {
            console.error('Error deleting dish:', error);
        }
    };

    return (
        <div className="body">

            <div>
                <h2 className="sub-header">Existing Dishes</h2>
                {dishes.map((dish) => (
                    <div key={dish._id} className="dish-card">
                        {editDish && editDish._id === dish._id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editDish.name}
                                    onChange={(e) => setEditDish({ ...editDish, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editDish.description}
                                    onChange={(e) => setEditDish({ ...editDish, description: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editDish.price}
                                    onChange={(e) => setEditDish({ ...editDish, price: e.target.value })}
                                />
                                <div className="crud-buttons">
                                    <button className="save-button" onClick={handleUpdateDish}>
                                        Save
                                    </button>
                                    <button className="cancel-button" onClick={() => setEditDish(null)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="dish-card-title">{dish.name}</h3>
                                <p className="dish-card-description">{dish.description}</p>
                                <p className="dish-card-price">Price: ${dish.price}</p>
                                <div className="crud-buttons">
                                    <Link to={`/dishes/edit/${dish._id}`}>
                                        <button className="edit-button">Edit</button>
                                    </Link>
                                    <Link to={`/dishes/details/${dish._id}`}>
                                        <button className="details-button">Details</button>
                                    </Link>
                                    <button className="delete-button" onClick={() => handleDeleteDish(dish._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DishList;
