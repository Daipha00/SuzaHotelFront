import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './AddVenue.css';


export default function AddVenue() {
  const [venueName, setVenueName] = useState('');
  const [venueType, setVenueType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const [venuePackage, setVenuePackage] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]); // Handle multiple images
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages(e.target.files); // Store multiple files
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('venueName', venueName);
    formData.append('venueType', venueType);
    formData.append('capacity', capacity);
    formData.append('location', location);
    formData.append('venuePackage', venuePackage);
    formData.append('description', description);
    // Append multiple images
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    axios.post('http://localhost:9090/venue', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      toast.success("Venue added successfully!", {
        position: "top-right",
        autoClose: 5000,
      });
      navigate('/contents/venueTable'); // Navigate to the list of venues or wherever needed
    })
    .catch(error => {
      console.error(error);
      toast.error("Failed to add venue.", {
        position: "top-right",
        autoClose: 5000,
      });
    });
  };

  return (
    <div>
    
        <div className="main">
          <h3 className='mt-3 mb-5'>
            {/* <i className='fa fa-get-pocket ms-2'> </i> Available Venues */}
          </h3>
          {/* <hr className='media-line' /> */}
          {/* <h2>Add a New Venue</h2> */}
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label>Venue Name:</label>
                <input 
                  type="text" 
                  value={venueName} 
                  onChange={(e) => setVenueName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Venue Type:</label>
                <select className="form-control" value={venueType} onChange={(e) => setVenueType(e.target.value)} required>
                  <option value="">Venue Type</option>
                  <option value="Conference Hall">Conference Hall</option>
                  <option value="Meeting Room">Meeting Room</option>
                  <option value="Exhibition Hall">Exhibition Hall</option>
                  <option value="Exhibition Hall">Training Room</option>
                  <option value="Wedding Hall">Wedding Hall</option>
                  
                </select>
              </div>
            </div>

            <div className="form-row">
            <div className="form-group">
                <label>Location:</label>
                <select className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required>
                <option value="">Location</option>
                  <option value="Tunguu">Tunguu</option>
                  <option value="Mbweni">Mbweni</option>
                  <option value="Maruhubi">Maruhubi</option>
                  <option value="Kilimani">Kilimani</option>
                  <option value="Chwaka">Chwaka</option>
                  <option value="Pemba">Pemba</option>
                  <option value="Beit-el-ras">Beit-es-ras</option>
                </select>
              </div>
              <div className="form-group">
                <label>Venue Package:</label>
                <input 
                  type="text" 
                  value={venuePackage} 
                  onChange={(e) => setVenuePackage(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Capacity:</label>
                <input 
                  type="number" 
                  value={capacity} 
                  onChange={(e) => setCapacity(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
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

            <button type="submit" className="submit-button">Add Venue</button>
            <h3 className='mt-3 mb-5'>
            {/* <i className='fa fa-get-pocket ms-2'> </i> Available Venues */}
          </h3>
          </form>
          <ToastContainer />
        </div>
    </div>
    
  );
}
