import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Add react-bootstrap for modals

function VenueTable() {
    const [venueName, setVenueName] = useState('');
    const [venueType, setVenueType] = useState('');
    const [capacity, setCapacity] = useState('');
    const [location, setLocation] = useState('');
    const [venuePackage, setVenuePackage] = useState('');
    const [description, setDescription] = useState('');
    const [venueId, setVenueId] = useState(null);


    const [venues, setVenues] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedVenueId, setSelectedVenueId] = useState(null);

    const handleClose = () => setShow(false);

    const handleShow = (venue) => {
      setSelectedVenueId(venue.id);
      setFormData({
        venueName: venue.venueName,
        venueType: venue.venueType,
        capacity: venue.capacity,
        location: venue.location,
        venuePackage: venue.venuePackage,
        description: venue.description,
      });
      setShow(true);  // This is where we set the modal to show
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleVenueSelect = (id) => {
        setVenueId(id);
      };

    const handleSubmit = async (event) => {
  event.preventDefault();
  if (!venueId) {
    console.error('No venue ID selected');
    return;
  }

  const formData = new FormData();
  formData.append('venueName', venueName);
  formData.append('venueType', venueType);
  formData.append('capacity', capacity);
  formData.append('location', location); // change to venueLocation
  formData.append('venuePackage', venuePackage);
  formData.append('description', description);

  try {
    const response = await axios.put(`http://localhost:9090/venue/${venueId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Venue updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating the venue:', error.response?.data || error.message);
  }
};
    

    useEffect(() => {
        axios
            .get("http://localhost:9090/venue") 
            .then((response) => {
                setVenues(response.data);
            })
            .catch((error) => {
                console.error("Error fetching venues:", error);
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
          .delete(`http://localhost:9090/venue/${id}`)
          .then(() => {
            setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== id));
          })
          .catch((error) => {
            console.error("There was an error deleting the venue!", error);
          });
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Venue Table</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active">Venue Table</li>
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
                                    <h3 className="card-title">Table of Venues</h3>
                                </div>
                                <div className="card-body">
                                    <table
                                        id="example2"
                                        className="table table-bordered table-hover"
                                    >
                                        <thead>
                                            <tr>
                                                <th>Venue Name</th>
                                                <th>Venue Type</th>
                                                <th>Capacity</th>
                                                <th>Location</th>
                                                <th>Venue Package</th>
                                                <th>Description</th>
                                                <th>Images</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {venues.map((venue) => (
                                                <tr key={venue.id}>
                                                    <td>{venue.venueName}</td>
                                                    <td>{venue.venueType}</td>
                                                    <td>{venue.capacity}</td>
                                                    <td>{venue.location}</td>
                                                    <td>{venue.venuePackage}</td>
                                                    <td>{venue.description}</td>
                                                    <td>
                                                        <button
                                                            className="btn"
                                                            style={{ background: "none", border: "none", color: "blue" }}
                                                            onClick={() => handleImageClick(venue.imageIds)}
                                                        >
                                                            <i className="fas fa-images"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn"
                                                            style={{ background: "none", border: "none", color: "blue" }}
                                                            onClick={() => handleShow(venue)} // Call handleShow with the venue data
                                                        >
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>

                                                        <button
                                                            className="btn"
                                                            style={{ background: "none", border: "none", color: "red" }}
                                                            onClick={() => handleDelete(venue.id)}
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

            {/* Modal for updating venue */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Venue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="venueName">Venue Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="venueName"
                                name="venueName"
                                value={formData.venueName || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="venueType">Venue Type</label>
                            <input
                                type="text"
                                className="form-control"
                                id="venueType"
                                name="venueType"
                                value={formData.venueType || ""}
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
                            <label htmlFor="venuePackage">Venue Package</label>
                            <input
                                type="text"
                                className="form-control"
                                id="venuePackage"
                                name="venuePackage"
                                value={formData.venuePackage || ""}
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
                    <Modal.Title>Venue Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedImages.length > 0 ? (
                        selectedImages.map((imageId) => (
                            <img
                                key={imageId}
                                src={`http://localhost:9090/venue/images/${imageId}`} // Replace with your backend image URL endpoint
                                alt="Venue"
                                className="img-thumbnail"
                                style={{ width: "100%", marginBottom: "10px" }}
                            />
                        ))
                    ) : (
                        <p>No images available for this venue.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default VenueTable;
