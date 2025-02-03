import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ManageTable() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all reservations
  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:9090/reservation");
      setReservations(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setError("Failed to fetch reservations. Please try again later.");
      setLoading(false);
    }
  };

  const handleConfirmClick = async (reservationId) => {
    try {
      const response = await axios.put(`http://localhost:9090/reservation/confirm/${reservationId}`);

      if (response.status === 200) {
        // Update reservation status in the state
        setReservations(
          reservations.map((res) =>
            res.id === reservationId ? { ...res, status: "Confirmed" } : res
          )
        );

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Reservation Confirmed",
          text: "The reservation has been successfully confirmed.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      // Handle error
      console.error("Error confirming reservation:", err);

      Swal.fire({
        icon: "error",
        title: "Confirmation Failed",
        text: err.response?.data || "An unexpected error occurred.",
      });
    }
  };


  // Update reservation status to "Cancelled"
  const handleCancelClick = async (reservationId) => {
    try {
      await axios.put(`http://localhost:9090/reservation/cancel/${reservationId}`, {
        status: "Cancelled",
      });
      setReservations(
        reservations.map((res) =>
          res.id === reservationId ? { ...res, status: "Cancelled" } : res
        )
      );
    } catch (err) {
      console.error("Error cancelling reservation:", err);
    }
  };

  const handleViewClick = (reservationId) => {
    navigate(`/contents/reservationById/${reservationId}`);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return <p>Loading reservations...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Manage Reservations</h3>
                </div>
                <div className="card-body">
                  {reservations.length > 0 ? (
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Reservation ID</th>
                          <th>Check-in</th>
                          <th>Check-out</th>
                          <th>Number of Guests</th>
                          <th>Special Request</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map((reservation) => (
                          <tr key={reservation.id}>
                            <td>{reservation.id}</td>
                            <td>{reservation.check_in}</td>
                            <td>{reservation.check_out}</td>
                            <td>{reservation.numberOfGuests}</td>
                            <td>{reservation.special_request}</td>
                            <td>
                              <span
                                className={`badge ${reservation.status === "Confirmed"
                                  ? "badge-success"
                                  : reservation.status === "Cancelled"
                                    ? "badge-danger"
                                    : "badge-warning"
                                  }`}
                              >
                                {reservation.status || "Pending"}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() => handleViewClick(reservation.id)}
                                aria-label="View Reservation"
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              {reservation.status !== "Cancelled" && reservation.status !== "Confirmed" && (
                                <>
                                  {/* Cancel Button */}
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => handleCancelClick(reservation.id)}
                                    aria-label="Cancel Reservation"
                                  >
                                    <i className="fas fa-times"></i> Cancel
                                  </button>

                                  {/* Confirm Button */}
                                  <button
                                    className="btn btn-success"
                                    onClick={() => handleConfirmClick(reservation.id)}
                                    aria-label="Confirm Reservation"
                                  >
                                    <i className="fas fa-check"></i> Confirm
                                  </button>
                                </>
                              )}



                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No reservations available.</p>
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

export default ManageTable;
