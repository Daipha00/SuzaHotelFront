import { useLocation } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useHotel } from "./HotelContext";

function RTable() {
    const location = useLocation();
    const { hotelId } = useHotel();
    const navigate = useNavigate();
  
    const [rooms, setRooms] = useState([]);
    const [hotel, setHotel] = useState({});
    const [selectedImages, setSelectedImages] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (hotelId) {
          axios.get(`http://localhost:9090/room/hotel/${hotelId}`).then((response) => {
            setRooms(response.data);
          });
    
          axios.get(`http://localhost:9090/hotel/${hotelId}`).then((response) => {
            setHotel(response.data);
          });
        }
      }, [hotelId]);
    
      const navigateToAddRoom = () => {
        navigate("/contents/addRoom"); // No need to pass hotelId
      };

    const handleImageClick = (imageIds) => {
        setSelectedImages(imageIds);
        setShowModal(true);
    };


    const handleUpdate = (roomId) => {
        // Navigate to the update form for this room
        // Example: Redirect to another page or open a modal
        console.log(`Update room with ID: ${roomId}`);
    };

    const handleDelete = (roomId) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            axios
                .delete(`http://localhost:9090/room/${roomId}`)
                .then(() => {
                    setRooms(rooms.filter((room) => room.id !== roomId)); // Update state
                    alert("Room deleted successfully.");
                })
                .catch((error) => {
                    console.error("Error deleting room:", error);
                    alert("Failed to delete room.");
                });
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImages([]);
    };

    // const navigateToAddRoom = () => {
    //     navigate('/contents/addRoom', { state: { hotelId } }); // Pass hotelId as state
    // };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <h1>Rooms for {hotel.hotelName}</h1>
            </section>
            <div style={{ textAlign: "right", marginBottom: "10px" }}>
                <button
                    className="btn"
                    style={{ color: "blue" }}
                    onClick={navigateToAddRoom}
                >
                    <i className="fas fa-plus-circle"></i> Add Room
                </button>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Room Type</th>
                                <th>Capacity</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Images</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room) => (
                                <tr key={room.id}>
                                    <td>{room.roomType}</td>
                                    <td>{room.pax}</td>
                                    <td>{room.price}</td>
                                    <td>{room.description}</td>
                                    <td>
                                        <button
                                            className="btn"
                                            onClick={() => handleImageClick(room.imageIds)}
                                            style={{ color: "blue" }} // Set color to blue
                                        >
                                            <i className="fas fa-images"></i>
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className="btn"
                                            style={{ color: "green" }}
                                            onClick={() => handleUpdate(room.id)}
                                        >
                                            <i className="fas fa-edit"></i> {/* Update Icon */}
                                        </button>
                                        <button
                                            className="btn"
                                            style={{ color: "red" }}
                                            onClick={() => handleDelete(room.id)}
                                        >
                                            <i className="fas fa-trash"></i> {/* Delete Icon */}
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>


            {showModal && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Room Images</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedImages.map((imageId) => (
                            <img
                                key={imageId}
                                src={`http://localhost:9090/room/image/${imageId}`}
                                alt={`Room Image ${imageId}`}
                                style={{ width: "100%", marginBottom: "10px" }}
                            />
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default RTable;
