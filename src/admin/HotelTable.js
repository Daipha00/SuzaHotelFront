import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HotelTable() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch hotels from the API
  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:9090/hotel");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Navigate to the room table page with hotelId as state
  const handleRoomsClick = (hotelId) => {
    navigate(`/rTable`, { state: { hotelId } });
  };

  // Handle image click (optional logic)
  const handleImageClick = (hotelId) => {
    console.log(`Clicked on images for hotel with ID: ${hotelId}`);
    // Add logic for handling image click
  };

  // Handle hotel edit (optional logic)
  const handleShow = (hotel) => {
    console.log("Edit hotel:", hotel);
    // Add logic for showing the edit form/modal
  };

  // Handle hotel deletion
  const handleDelete = async (hotelId) => {
    try {
      await axios.delete(`http://localhost:9090/hotel/${hotelId}`);
      console.log(`Deleted hotel with ID: ${hotelId}`);
      fetchHotels(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Table of Hotels</h3>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Hotel Name</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Rooms</th>
                        <th>Images</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hotels.map((hotel) => (
                        <tr key={hotel.id}>
                          <td>{hotel.hotelName}</td>
                          <td>{hotel.location}</td>
                          <td>{hotel.price}</td>
                          <td>{hotel.rating}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleRoomsClick(hotel.id)}
                            >
                              Rooms
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn"
                              style={{ background: "none", border: "none", color: "blue" }}
                              onClick={() => handleImageClick(hotel.id)}
                            >
                              <i className="fas fa-images"></i>
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn"
                              style={{ background: "none", border: "none", color: "blue" }}
                              onClick={() => handleShow(hotel)}
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </button>

                            <button
                              className="btn"
                              style={{ background: "none", border: "none", color: "red" }}
                              onClick={() => handleDelete(hotel.id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HotelTable;
