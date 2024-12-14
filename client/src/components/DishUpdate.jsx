import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import '../style.css'; // Import the CSS

const DishUpdate = () => {
	const { dishId } = useParams(); // Get the dishId from the URL
	const [dish, setDish] = useState(null);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [restaurant, setRestaurant] = useState('');
	const [category, setCategory] = useState('');
	const [restaurants, setRestaurants] = useState([]);
	const [categories, setCategories] = useState([]);

	// Fetch restaurants and categories when component mounts
	useEffect(() => {
		const fetchRestaurants = async () => {
			try {
				const res = await axios.get('http://localhost:3000/api/restaurants');
				setRestaurants(res.data);
			} catch (err) {
				console.error('Error fetching restaurants:', err);
			}
		};

		const fetchCategories = async () => {
			try {
				const res = await axios.get('http://localhost:3000/api/categories');
				setCategories(res.data);
			} catch (err) {
				console.error('Error fetching categories:', err);
			}
		};

		const fetchDish = async () => {
			console.log("aboba2");
			if (!dishId) return;
			console.log("aboba3");

			try {
				const res = await axios.get(`http://localhost:3000/api/dishes/${dishId}`);
				console.log("dishdata ",res.data);
				setDish(res.data);
				setName(res.data.name);
				setPrice(res.data.price);
				setDescription(res.data.desciption);
				setCategory(res.data.category);
				setRestaurant(res.data.restaurant);
			} catch (err) {
				console.error('Error fetching dish:', err);
			}
		};

		fetchRestaurants();
		fetchCategories();
		fetchDish();
	}, [dishId]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.put(`http://localhost:3000/api/dishes/${dishId}`, {name: name, desciption: description, price: price, category: category, restaurant: restaurant});
			alert('Dish updated successfully!');
		} catch (err) {
			console.error('Error updating dish:', err);
			alert('Failed to update dish. Please try again.');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="form-container">
			<div>
				<label htmlFor="name">Dish Name:</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					minLength={3}
					maxLength={45}
				/>
			</div>

			<div>
				<label htmlFor="description">Description:</label>
				<textarea
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					maxLength={500}
					className="form-container-textarea"
				></textarea>
			</div>

			<div>
				<label htmlFor="price">Price:</label>
				<input
					type="number"
					id="price"
					value={price}
					onChange={(e) => setPrice(parseFloat(e.target.value))}
					required
					min={0}
					max={10000000}
				/>
			</div>

			<div>
				<label htmlFor="restaurant">Restaurant:</label>
				<select
					id="restaurant"
					value={restaurant}
					onChange={(e) => setRestaurant(e.target.value)}
					required
					className="form-container-select"
				>
					<option value="">Select a restaurant</option>
					{restaurants.map((r) => (
						<option key={r._id} value={r._id}>
							{r.restaurantName}
						</option>
					))}
				</select>
			</div>

			<div>
				<label htmlFor="category">Category:</label>
				<select
					id="category"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					required
					className="form-container-select"
				>
					<option value="">Select a category</option>
					{categories.map((c) => (
						<option key={c._id} value={c._id}>
							{c.name}
						</option>
					))}
				</select>
			</div>

			<button type="submit" className="create-button">Update Dish</button>
		</form>
	);
};

export default DishUpdate;
