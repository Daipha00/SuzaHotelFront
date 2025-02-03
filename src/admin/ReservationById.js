import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../clints/MyReservation.css";

function ReservationById() {
    const { reservationId } = useParams();
    const [clientInfo, setClientInfo] = useState(null);
    const [reservationDetails, setReservationDetails] = useState(null);
    const [venueOrRoomDetails, setVenueOrRoomDetails] = useState(null);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("client"); // Default to "client" tab
    const [reservations, setReservations] = useState([]);


    useEffect(() => {
        // Fetch client information
        axios
            .get(`http://localhost:9090/reservation/client-by-reservation/${reservationId}`)
            .then((response) => setClientInfo(response.data))
            .catch((err) => setError("Error fetching client information: " + err.message));

        // Fetch reservation details
        axios
            .get(`http://localhost:9090/reservation/${reservationId}`)
            .then((response) => {
                setReservationDetails(response.data);
                setReservations([response.data]); // Ensure reservation details are stored in the reservations array
            })
            .catch((err) => setError("Error fetching reservation details: " + err.message));


        // Fetch room or venue details
        axios
            .get(`http://localhost:9090/reservation/details/${reservationId}`)
            .then((response) => setVenueOrRoomDetails(response.data))
            .catch((err) => setError("Error fetching venue/room details: " + err.message));
    }, [reservationId]);

    // Generate a custom reservation number for each reservation
    const generateReservationNo = (reservationId) => {
        if (typeof reservationId === 'string') {
            return `RES-${reservationId.slice(-4)}`;
        } else if (typeof reservationId === 'number') {
            return `RES-${reservationId.toString().slice(-4)}`;
        } else {
            console.error("Invalid reservationId type:", reservationId);
            return 'RES-ERROR';
        }
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>All Reservations</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">All Reservations</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <ul className="nav nav-tabs justify-content-center custom-tabs">
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link ${activeTab === "client" ? "active" : ""}`}
                                                onClick={() => setActiveTab("client")}
                                            >
                                                Client Information
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link ${activeTab === "reservation" ? "active" : ""}`}
                                                onClick={() => setActiveTab("reservation")}
                                            >
                                                Reservation Information
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link ${activeTab === "details" ? "active" : ""}`}
                                                onClick={() => setActiveTab("details")}
                                            >
                                                Service Details
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    {error ? (
                                        <p>{error}</p>
                                    ) : (
                                        <>
                                            {activeTab === "client" && clientInfo && (
                                                <div className="client-info-container">
                                                    <div className="client-info-item"><strong>First Name:</strong> {clientInfo.userFirstName}</div>
                                                    <div className="client-info-item"><strong>Last Name:</strong> {clientInfo.userLastName}</div>
                                                    <div className="client-info-item"><strong>Email:</strong> {clientInfo.email}</div>
                                                    <div className="client-info-item"><strong>Phone:</strong> {clientInfo.phoneNumber}</div>
                                                    <div className="client-info-item"><strong>Address:</strong> {clientInfo.address}</div>
                                                    <div className="client-info-item"><strong>City:</strong> {clientInfo.city}</div>
                                                    <div className="client-info-item"><strong>Zipcode:</strong> {clientInfo.zipcode}</div>
                                                    <div className="client-info-item"><strong>Country:</strong> {clientInfo.country}</div>
                                                    <div className="client-info-item"><strong>Gender:</strong> {clientInfo.gender}</div>
                                                    <div className="client-info-item"><strong>Passport:</strong> {clientInfo.passport}</div>
                                                </div>
                                            )}

                                            {activeTab === "reservation" && (
                                                <div>
                                                    {!reservationDetails ? (
                                                        <p>Loading reservation details...</p>
                                                    ) : (

                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Reservation No</th>
                                                                    <th>Type</th>
                                                                    <th>Check-in</th>
                                                                    <th>Check-out</th>
                                                                    <th>Expected Arrival Time</th>
                                                                    <th>Number of Guests</th>
                                                                    <th>Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {reservations.map((reservation) => (
                                                                    <tr key={reservation.id}>
                                                                        <td>{generateReservationNo(reservation.id)}</td>
                                                                        <td>
                                                                            {reservation.room ? "Room Reservation" : "Venue Reservation"}
                                                                        </td>
                                                                        <td>{reservation.check_in}</td>
                                                                        <td>{reservation.check_out}</td>
                                                                        <td>{reservation.arrival_time}</td>
                                                                        <td>{reservation.numberOfGuests}</td>
                                                                        <td>{reservation.status || "Pending"}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    )}
                                                </div>
                                            )}

                                            {activeTab === "details" && (
                                                <div>
                                                    {!venueOrRoomDetails ? (
                                                        <p>Loading room/venue details...</p>
                                                    ) : (
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Reservation No</th>
                                                                    <th>{venueOrRoomDetails.roomType ? "Room Type" : "Venue Name"}</th>
                                                                    {venueOrRoomDetails.roomType ? (
                                                                        <>
                                                                            <th>Capacity</th>
                                                                            <th>Price</th>
                                                                            <th>Description</th>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <th>Venue Type</th>
                                                                            <th>Capacity</th>
                                                                            <th>Location</th>
                                                                            <th>Package</th>
                                                                            <th>Description</th>
                                                                        </>
                                                                    )}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>{generateReservationNo(reservationId)}</td>
                                                                    {venueOrRoomDetails.roomType ? (
                                                                        <>
                                                                            <td>{venueOrRoomDetails.roomType}</td>
                                                                            <td>{venueOrRoomDetails.pax}</td>
                                                                            <td>{venueOrRoomDetails.price}</td>
                                                                            <td>{venueOrRoomDetails.description}</td>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <td>{venueOrRoomDetails.venueName}</td>
                                                                            <td>{venueOrRoomDetails.venueType}</td>
                                                                            <td>{venueOrRoomDetails.capacity}</td>
                                                                            <td>{venueOrRoomDetails.location}</td>
                                                                            <td>{venueOrRoomDetails.venuePackage}</td>
                                                                            <td>{venueOrRoomDetails.description}</td>
                                                                        </>
                                                                    )}
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    )}
                                                </div>
                                            )}

                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ReservationById;
