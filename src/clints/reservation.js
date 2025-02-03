import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

function Reservation() {
  const navigate = useNavigate();
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(null);
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(null);
  const [formData, setFormData] = useState({
    arrival_time: "",
    depature_time: "",
    numberOfGuests: 0,
    special_request: "",
  });

  const [reservationDetails, setReservationDetails] = useState({
    userId: null,
    venueId: null,
    check_in: null,  // Updated field name to match backend model
    check_out: null,  // Updated field name to match backend model
    arrival_time: "",
    depature_time: "",
    numberOfGuests: 0,
    special_request: "",
  });

  useEffect(() => {
    // Retrieve user and venue details from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const venueId = localStorage.getItem("venueId");
    const clientId = localStorage.getItem("clientId");

    if (storedUser && venueId && clientId) {
        setReservationDetails((prevDetails) => ({
            ...prevDetails,
            userId: clientId,  // Use clientId as userId for reservation
            venueId: venueId,
        }));
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservationPayload = {
      ...reservationDetails,
      check_in: selectedCheckInDate ? selectedCheckInDate.toISOString().split("T")[0] : null,  // Format as 'yyyy-MM-dd'
      check_out: selectedCheckOutDate ? selectedCheckOutDate.toISOString().split("T")[0] : null,  // Format as 'yyyy-MM-dd'
      arrival_time: formData.arrival_time,
      depature_time: formData.depature_time,
      numberOfGuests: formData.numberOfGuests,
      special_request: formData.special_request,
    };

    try {
      const response = await axios.post(
        `http://localhost:9090/venue_reservation?clientId=${reservationDetails.userId}&venueId=${reservationDetails.venueId}`, 
        reservationPayload
      );

      if (response.status === 200) {
        alert("Reservation successful!");
        navigate('/contents/myReservations');
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Failed to create reservation. Please try again.");
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6"></div>
            <div className="col-sm-6">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Reservation Form
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Reservation Details</h3>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="check_in">Check-In:</label>
                          <DatePicker
                            id="check_in"
                            selected={selectedCheckInDate}
                            onChange={(date) => setSelectedCheckInDate(date)}
                            className="form-control"
                            placeholderText="Check-In date"
                            dateFormat="MM/dd/yyyy"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="arrival_time">Expected Arrival Time:</label>
                          <input
                            type="time"
                            className="form-control"
                            id="arrival_time"
                            name="arrival_time"
                            value={formData.arrival_time}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="check_out">Check-Out:</label>
                          <DatePicker
                            id="check_out"
                            selected={selectedCheckOutDate}
                            onChange={(date) => setSelectedCheckOutDate(date)}
                            className="form-control"
                            placeholderText="Check-Out date"
                            dateFormat="MM/dd/yyyy"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="depature_time">Departure Time:</label>
                          <input
                            type="time"
                            className="form-control"
                            id="depature_time"
                            name="depature_time"
                            value={formData.depature_time}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="numberOfGuests">Number of Guests:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="numberOfGuests"
                        name="numberOfGuests"
                        value={formData.numberOfGuests || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="special_request">Special Request:</label>
                      <textarea
                        className="form-control"
                        id="special_request"
                        name="special_request"
                        rows="3"
                        value={formData.special_request}
                        onChange={handleChange}
                        placeholder="Enter your special request..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Reservation;
