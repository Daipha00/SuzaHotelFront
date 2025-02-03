import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './AddHotel.css';

export default function AddHotel() {
  const [hotelName, setHotelName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('hotelName', hotelName);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('rating', rating);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    axios.post('http://localhost:9090/hotel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      toast.success("Hotel added successfully!", {
        position: "top-right",
        autoClose: 5000,
      });
      navigate('/contents/hotelTable'); // Adjust route as necessary
    })
    .catch(error => {
      console.error(error);
      toast.error("Failed to add hotel.", {
        position: "top-right",
        autoClose: 5000,
      });
    });
  };

  return (
    <div className="main">
      <h3 className="mt-3 mb-5">Add a New Hotel</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label>Hotel Name:</label>
            <input
              type="text"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Rating:</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-button" style={{marginBottom: "100px"}}>Add Hotel</button>
      </form>
      <ToastContainer />
    </div>
  );
}
