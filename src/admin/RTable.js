import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

function RTable() {
 
    const [roomType, setRoomType] = useState('');
    const [pax, setPax] = useState('');
    const [description, setDescription] = useState('');
    const [roomId, setRoomId] = useState(null);

    const [rooms, setRooms] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    const handleClose = () => setShow(false);

    const handleShow = (room) => {
        setSelectedRoomId(room.id);
        setFormData({
         
            roomType: room.roomType,
            pax: room.pax,
            description: room.description,
        });
        setShow(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoomSelect = (id) => {
        setRoomId(id);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!roomId) {
            console.error('No room ID selected');
            return;
        }

        const formData = new FormData();
       
        formData.append('roomType', roomType);
        formData.append('pax', pax);
       
        formData.append('description', description);

        try {
            const response = await axios.put(`http://localhost:9090/room/${roomId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Room updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating the room:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        axios
            .get("http://localhost:9090/room")
            .then((response) => {
                setRooms(response.data);
            })
            .catch((error) => {
                console.error("Error fetching rooms:", error);
            });
    }, []);

    const handleImageClick = (imageIds) => {
        setSelectedImages(imageIds);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImages([]);
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:9090/room/${id}`)
            .then(() => {
                setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
            })
            .catch((error) => {
                console.error("There was an error deleting the room!", error);
            });
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Room Table</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active">Room Table</li>
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
                                    <h3 className="card-title">Table of Rooms</h3>
                                </div>
                                <div className="card-body">
                                    <table
                                        id="example2"
                                        className="table table-bordered table-hover"
                                    >
                                        <thead>
                                            <tr>
                                               
                                                <th>Room Type</th>
                                                <th>Capacity</th>
                                               
                                              
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
                                                   
                                                    <td>{room.description}</td>
                                                    <td>
                                                        <button
                                                            className="btn"
                                                            style={{ background: "none", border: "none", color: "blue" }}
                                                            onClick={() => handleImageClick(room.imageIds)}
                                                        >
                                                            <i className="fas fa-images"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn"
                                                            style={{ background: "none", border: "none", color: "blue" }}
                                                            onClick={() => handleShow(room)} 
                                                        >
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>

                                                        <button
                                                            className="btn"
                                                            style={{ background: "none", border: "none", color: "red" }}
                                                            onClick={() => handleDelete(room.id)}
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

            {/* Modal for updating room */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="roomName">Room Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roomName"
                                name="roomName"
                                value={formData.roomName || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="roomType">Room Type</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roomType"
                                name="roomType"
                                value={formData.roomType || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="capacity">Capacity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="capacity"
                                name="capacity"
                                value={formData.capacity || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                id="location"
                                name="location"
                                value={formData.location || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                value={formData.price || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={formData.description || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for displaying images */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Room Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedImages.length > 0 ? (
                        selectedImages.map((imageId) => (
                            <img
                                key={imageId}
                                src={`http://localhost:9090/room/images/${imageId}`} 
                                alt="Room"
                                className="img-thumbnail"
                                style={{ width: "100%", marginBottom: "10px" }}
                            />
                        ))
                    ) : (
                        <p>No images available for this room.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default RTable;
