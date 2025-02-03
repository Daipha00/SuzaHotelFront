import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyReservation.css";

function MyReservations() {
    const [clientInfo, setClientInfo] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [venueOrRoomDetails, setVenueOrRoomDetails] = useState({}); // Use an object to store unique reservation details
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("client");
    const [dialogOpen, setDialogOpen] = useState(false); // To manage dialog visibility
    const [selectedReservation, setSelectedReservation] = useState(null); // To store selected reservation details

    useEffect(() => {
        const clientId = localStorage.getItem("clientId");

        if (!clientId) {
            setError("Client ID is missing in local storage.");
            return;
        }

        // Fetch client information
        axios
            .get(`http://localhost:9090/client/${clientId}`)
            .then((response) => {
                setClientInfo(response.data);
            })
            .catch((err) => {
                setError("Error fetching client information: " + err.message);
            });

        // Fetch all reservations for the client
        axios
            .get(`http://localhost:9090/reservation/client/${clientId}`)
            .then((response) => {
                setReservations(response.data);
                // Automatically fetch room/venue details for all reservations
                const reservationIds = response.data.map((reservation) => reservation.id);

                // Avoid fetching duplicate reservation details
                reservationIds.forEach((reservationId) => {
                    if (!venueOrRoomDetails[reservationId]) {
                        axios
                            .get(`http://localhost:9090/reservation/details/${reservationId}`)
                            .then((res) => {
                                setVenueOrRoomDetails((prevDetails) => ({
                                    ...prevDetails,
                                    [reservationId]: res.data,
                                }));
                            })
                            .catch((err) => {
                                setError("Error fetching venue/room details: " + err.message);
                            });
                    }
                });
            })
            .catch((err) => {
                setError("Error fetching reservations: " + err.message);
            });
    }, [venueOrRoomDetails]);

    // Generate a custom reservation number for each reservation
    const generateReservationNo = (reservationId) => {
        if (typeof reservationId === 'string') {
            return `RES-${reservationId.slice(-4)}`; // Just an example of generating a custom reservation number
        } else if (typeof reservationId === 'number') {
            return `RES-${reservationId.toString().slice(-4)}`; // Handle as number and convert to string
        } else {
            console.error("Invalid reservationId type:", reservationId);
            return 'RES-ERROR'; // Return a default error value
        }
    };

    const handleEditReservation = (reservation) => {
        setSelectedReservation(reservation);  // Set the selected reservation details
        setDialogOpen(true); // Open the dialog for editing
    };

    const handleDialogClose = () => {
        setDialogOpen(false);  // Close the dialog
        setSelectedReservation(null);  // Reset the selected reservation
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedReservation((prev) => ({
            ...prev,
            [name]: value, // Update the respective field
        }));
    };

    const handleUpdateReservation = () => {
        if (selectedReservation) {
            axios
                .put(`http://localhost:9090/reservation/${selectedReservation.id}`, selectedReservation)
                .then((response) => {
                    // Update the reservations state with the updated reservation
                    const updatedReservations = reservations.map((reservation) =>
                        reservation.id === response.data.id ? response.data : reservation
                    );
                    setReservations(updatedReservations);
                    handleDialogClose(); // Close the dialog after update
                })
                .catch((err) => {
                    console.error("Error updating reservation:", err);
                    // Optionally, you can set an error state for displaying error messages
                });
        }
    };


    // Function to handle reservation cancellation
    const handleCancelReservation = (reservationId) => {
        // Update the status of the reservation to "Cancelled"
        const confirmCancel = window.confirm("Are you sure you want to cancel this reservation?");

        if (confirmCancel) {
            setReservations((prevReservations) =>
                prevReservations.map((reservation) =>
                    reservation.id === reservationId
                        ? { ...reservation, status: "Cancelled" }
                        : reservation
                )
            );

            // Optionally, you can call an API to update the status in the backend
            axios
                .put(`http://localhost:9090/reservation/cancel/${reservationId}`, { status: "Cancelled" })
                .catch((err) => {
                    setError("Error updating reservation status: " + err.message);
                });
        }
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>My Reservations</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active">My Reservations</li>
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
                                                Room/Venue Details
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
                                                    {reservations.length === 0 ? (
                                                        <p>No reservations found.</p>
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
                                                                    <th>Special Request</th>
                                                                    <th>Action</th>
                                                                    <th>Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {reservations.map((reservation) => (
                                                                    <tr key={reservation.id}>
                                                                        <td>{generateReservationNo(reservation.id)}</td> {/* Display Reservation No */}
                                                                        <td>
                                                                            {reservation.room
                                                                                ? "Room Reservation"
                                                                                : "Venue Reservation"}
                                                                        </td>
                                                                        <td>{reservation.check_in}</td>
                                                                        <td>{reservation.check_out}</td>
                                                                        <td>{reservation.arrival_time}</td>
                                                                        <td>{reservation.numberOfGuests}</td>
                                                                        <td>{reservation.special_request}</td>
                                                                        <td>
                                                                            <button
                                                                                className="btn"
                                                                                style={{ background: "none", border: "none", color: "blue" }}
                                                                                onClick={() => handleEditReservation(reservation)} // Pass the clicked reservation to the handler
                                                                            >
                                                                                <i className="fas fa-pencil-alt"></i> {/* Icon for edit */}
                                                                            </button>


                                                                            <button
                                                                                className="btn"
                                                                                style={{
                                                                                    backgroundColor: "#FF6347", // Tomato Red for cancel button
                                                                                    margin: "10px",
                                                                                    border: "none",
                                                                                    color: "white",
                                                                                    padding: "5px 10px",
                                                                                }}
                                                                                onClick={() => handleCancelReservation(reservation.id)} // Call cancel function
                                                                                disabled={reservation.status === "Cancelled" || reservation.status === "Confirmed"}
                                                                            >
                                                                                <i className="fas fa-times"></i> Cancel
                                                                            </button>
                                                                        </td>
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
                                                    {Object.keys(venueOrRoomDetails).length === 0 ? (
                                                        <p>No room/venue details available.</p>
                                                    ) : (
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Reservation No</th>
                                                                    <th>Room/Venue Name</th>
                                                                    <th>Details</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Object.keys(venueOrRoomDetails).map((reservationId) => {
                                                                    const detail = venueOrRoomDetails[reservationId];
                                                                    return (
                                                                        <tr key={reservationId}>
                                                                            <td>{generateReservationNo(reservationId)}</td>
                                                                            <td>
                                                                                {detail.roomType
                                                                                    ? "Room: " + detail.roomType
                                                                                    : "Venue: " + detail.venueName}
                                                                            </td>
                                                                            <td>
                                                                                {detail.roomType ? (
                                                                                    <>
                                                                                        <p><strong>Type:</strong> {detail.roomType}</p>
                                                                                        <p><strong>Pax:</strong> {detail.pax}</p>
                                                                                        <p><strong>Price:</strong> {detail.price}</p>
                                                                                        <p><strong>Hotel Name:</strong> {detail.hotel.hotelName}</p>
                                                                                        <p><strong>Hotel Location:</strong> {detail.hotel.location}</p>
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <p><strong>Venue Name:</strong> {detail.venueName}</p>
                                                                                        <p><strong>venueType:</strong>{detail.venueType}</p>
                                                                                        <p><strong>Location:</strong>{detail.location}</p>

                                                                                        <p><strong>Capacity:</strong> {detail.capacity}</p>
                                                                                    </>
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })}
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

export default MyReservations
