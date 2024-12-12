import React, { useEffect, useState } from "react";
import axios from "axios";

const DishDetails = ({ dishId }) => {
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/dishes/${dishId}`);
        setDish(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [dishId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dish-details">
      <h2>{dish.name}</h2>
      <p><strong>Description:</strong> {dish.desciption || "No description provided"}</p>
      <p><strong>Price:</strong> ${dish.price.toFixed(2)}</p>
      {dish.restaurant && (
        <p>
          <strong>Restaurant:</strong> {dish.restaurant.name}
        </p>
      )}
      {dish.category && (
        <p>
          <strong>Category:</strong> {dish.category.name}
        </p>
      )}
    </div>
  );
};

export default DishDetails;
