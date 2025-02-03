import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To access the hotelId from URL
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./ExtendedHotel.css"; // Import CSS for styling

const combinedStyle = {
 
    contentContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
    },
 
    rightSection: {
        display: 'flex',
        alignItems: 'center',
    },
 
    home: {
        padding: '20px',
    },
    hotelsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    hotelCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        textAlign: 'center',
        marginTop: '30px',
    },
  
 
    hotelImage: {
        width: '100%',
        height: '200px', // Set a fixed height
        borderRadius: '8px',
        objectFit: 'cover', // Ensures images fill the space without distortion
    },
};

const ExtendedHotel = () => {
    const { hotelId } = useParams(); // Get hotelId from URL
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false); // Track whether to show all images or not
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/room/hotel/${hotelId}`);


                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching Rooms:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRooms();
    }, [hotelId]);

    useEffect(() => {
        // Fetch all images for the hotel
        fetch(`http://localhost:9090/hotel/${hotelId}/images`)
            .then((response) => response.json())
            .then((data) => setImages(data))
            .catch((err) => setError(err));
        console.log(hotelId);
    }, [hotelId]);

    const shouldShowMoreButton = () => {
        const windowHeight = window.innerHeight;
        const imageHeight = 200; // Assuming each image is 200px tall (set in CSS below)
        const maxVisibleImages = Math.floor(windowHeight / imageHeight) * 5; // Number of images fitting in viewport

        return images.length > maxVisibleImages;
    };

    if (error) {
        return <div>Error loading images: {error.message}</div>;
    }

    return (
        <div className="extended-hotel-container">
            {/* <h1>Hotel Images</h1> */}
            {images.length === 0 ? (
                <p>No images available for this hotel.</p>
            ) : (
                <div className="image-gallery">
                    {/* Display images dynamically based on available space */}
                    {images.slice(0, showAll ? images.length : shouldShowMoreButton() ? 5 : images.length).map((image, index) => (
                        <div key={index} className="image-container">
                            <img
                                src={`data:image/jpeg;base64,${image}`}
                                alt={`Hotel image ${index + 1}`}
                                className="hotel-image"
                            />
                        </div>
                    ))}

                    {/* Show +N button only if necessary */}
                    {shouldShowMoreButton() && !showAll && (
                        <div className="image-container overlay-container">
                            <button
                                onClick={() => setShowAll(true)}
                                className="show-more-button"
                            >
                                +{images.length - 5} more
                            </button>
                        </div>
                    )}

                </div>
            )}


                     <div style={combinedStyle.home}>
                <h1>Rooms</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={combinedStyle.hotelsGrid}>
                        {rooms.map((room) => (
                            <div key={room.id} style={combinedStyle.hotelCard}>
                                <img
                                    src={`http://localhost:9090/room/${room.id}/image`}
                                    alt={room.roomType}
                                    style={combinedStyle.hotelImage}
                                />
                                <h2>{room.roomType}</h2>
                                <p><strong>pax:</strong> {room.pax}</p>
                                <p><strong>Description:</strong> {room.description}</p>
                               
                                {/* <button 
  type="button" 
  className="btn btn-block btn-primary" 
  onClick={() => handleClick(hotel.id)}
>
  More Details
</button> */}

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        
    );
};

export default ExtendedHotel;
