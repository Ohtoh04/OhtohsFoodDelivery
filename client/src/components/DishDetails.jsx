import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import '../style.css'; // Import the CSS

const DishDetails = () => {
	const { dishId } = useParams(); // Get the dishId from the URL
	const [dish, setDish] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [restaurants, setRestaurants] = useState([]);
	const [categories, setCategories] = useState([]);

	// Fetch restaurants, categories, and dish details when the component mounts
	useEffect(() => {
		const fetchRestaurants = async () => {
			try {
				const res = await axios.get('http://localhost:3000/api/restaurants'); // Adjust the endpoint to match your API
				setRestaurants(res.data);
			} catch (err) {
				console.error('Error fetching restaurants:', err);
			}
		};

		const fetchCategories = async () => {
			try {
				const res = await axios.get('http://localhost:3000/api/categories'); // Adjust the endpoint to match your API
				setCategories(res.data);
			} catch (err) {
				console.error('Error fetching categories:', err);
			}
		};

		const fetchDish = async () => {
			try {
				const res = await axios.get(`http://localhost:3000/api/dishes/${dishId}`);
				setDish(res.data);
				setLoading(false);
			} catch (err) {
				console.error('Error fetching dish details:', err);
				setError('Failed to fetch dish details. Please try again later.');
				setLoading(false);
			}
		};

		fetchRestaurants();
		fetchCategories();
		fetchDish();
	}, [dishId]);

	// Map restaurant and category IDs to names
	const getRestaurantName = () => {
		const restaurant = restaurants.find(r => r._id === dish.restaurant);
		return restaurant ? restaurant.restaurantName : 'Unknown';
	};

	const getCategoryName = () => {
		const category = categories.find(c => c._id === dish.category);
		return category ? category.name : 'Unknown';
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="details-container">
			<h1>{dish.name}</h1>
			<p><strong>Description:</strong> {dish.desciption}</p>
			<p><strong>Price:</strong> ${dish.price.toFixed(2)}</p>
			<p><strong>Restaurant:</strong> {getRestaurantName()}</p>
			<p><strong>Category:</strong> {getCategoryName()}</p>
		</div>
	);
};

export default DishDetails;
