import React, { useState } from "react";
import { useHotel } from "./HotelContext";
import { useNavigate } from "react-router-dom";

function AddRoom() {
    const { hotelId } = useHotel();

    const [formData, setFormData] = useState({
        roomType: "",
        pax: "",
        price: "",
        description: "",
        images: [], // Array to store image files
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: Array.from(e.target.files) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Append form data fields
        data.append("hotelId", hotelId);
        data.append("roomType", formData.roomType);
        data.append("pax", formData.pax);
        data.append("price", formData.price);
        data.append("description", formData.description);

        // Append images
        formData.images.forEach((image) => {
            data.append("images", image);
        });

        try {
            const response = await fetch(`http://localhost:9090/room/?hotelId=${hotelId}`, {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                console.log("Room added successfully");
                navigate("/contents/rTable");

                // Reset form data
                setFormData({
                    roomType: "",
                    pax: "",
                    price: "",
                    description: "",
                    images: [],
                });
            } else {
                console.error("Failed to add room:", response.statusText);
            }
        } catch (error) {
            console.error("Error during room addition:", error);
        }
    };

    const wrapperStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
    };

    const formStyle = {
        width: "400px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    };

    return (
        <div style={wrapperStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                {/* Room Type */}
                <div className="form-group">
                    <label htmlFor="roomType">Room Type:</label>
                    <select
                        className="form-control"
                        id="roomType"
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                    >
                        <option value="">Select Room Type</option>
                        <option value="Single Room">Single Room</option>
                        <option value="Double Room">Double Room</option>
                        <option value="Deluxe Room">Deluxe Room</option>
                    </select>
                </div>

                {/* Pax */}
                <div className="form-group">
                    <label htmlFor="pax">Pax:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="pax"
                        name="pax"
                        value={formData.pax}
                        onChange={handleChange}
                        placeholder="Enter pax"
                    />
                </div>

                {/* Price */}
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                    />
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter room description"
                    ></textarea>
                </div>

                {/* Images */}
                <div className="form-group">
                    <label htmlFor="images">Images:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="images"
                        name="images"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddRoom;
