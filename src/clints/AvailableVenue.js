import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../website/HomeVenue.css';
import { useNavigate } from 'react-router-dom';

function AvailableVenue() {
    const [isLoading, setIsLoading] = useState(true);
    const [venues, setVenues] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await axios.get('http://localhost:9090/venue');
                const venuesWithImages = await Promise.all(
                    response.data.map(async (venue) => {
                        const imageResponse = await axios.get(
                            `http://localhost:9090/venue/${venue.id}/image`,
                            { responseType: 'arraybuffer' }
                        );
                        const base64Image = await convertToBase64(imageResponse.data);
                        return { ...venue, image: base64Image };
                    })
                );
                setVenues(venuesWithImages);
            } catch (error) {
                console.error('Error fetching venues:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVenues();
    }, []);

    const convertToBase64 = (arrayBuffer) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result.split(',')[1]);
            };
            reader.onerror = reject;
            const blob = new Blob([arrayBuffer]);
            reader.readAsDataURL(blob);
        });
    };

    const handleReserveClick = (venueId) => {
        const user = JSON.parse(localStorage.getItem("user")); // Retrieve full user object from localStorage
        const clientId = user ? user.id : null; // Assuming the user object has an 'id' field for clientId
        const userRole = user ? user.role : null; // Assuming 'role' is stored in the user object

        // if (!clientId || userRole !== 'client') {
        //     alert("You must be logged in as a client to reserve a venue.");
        //     return;
        // }

        // Store both venueId and clientId in localStorage
        localStorage.setItem("venueId", venueId);
        localStorage.setItem("clientId", clientId);

        navigate("/contents/reservation");
    };

    const openPopup = (image) => {
        setSelectedImage(image);
    };

    const closePopup = () => {
        setSelectedImage(null);
    };

    const combinedStyle = {
        home: {
            padding: '20px',
            textAlign: 'center',
            marginLeft: '250px',
        },
        reserveButton: {
            marginTop: 'auto', // Push the button to the bottom of the card
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        
        
        venuesGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginTop: '20px',
        },
        venueCard: {
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            textAlign: 'center',
            display: 'flex', // Set flex container
            flexDirection: 'column', // Stack items vertically
            justifyContent: 'space-between', // Ensure proper spacing
            height: 'auto', // Let height adjust based on content
            width: '300px',
            margin: '0 auto',
        },
        reserveButton: {
            marginTop: 'auto', // Push the button to the bottom of the card
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        
        
        venueImage: {
            width: '100%',
            height: '200px', // Set a fixed height for images
            objectFit: 'cover', // Ensures the image maintains aspect ratio while fitting
            cursor: 'pointer',
            borderRadius: '8px',
        },
        popupOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
        },
        popupContent: {
            position: 'relative',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '80%',
            maxHeight: '80%',
            overflow: 'auto',
        },
        popupImage: {
            width: '100%',
            height: 'auto',
        },
        closeButton: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '30px',
            color: '#000',
            cursor: 'pointer',
        },
    };

    return (
        <div>
            <div style={combinedStyle.home}>
                <h1>Available Venues</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={combinedStyle.venuesGrid}>
                        {venues.map((venue) => (
                            <div key={venue.id} style={combinedStyle.venueCard}>
                                <img
                                    src={`data:image/jpeg;base64,${venue.image}`}
                                    alt={venue.venueName}
                                    style={combinedStyle.venueImage}
                                    onClick={() => openPopup(venue.image)}
                                />
                                <h2>{venue.venueName}</h2>
                                <p><strong>Type:</strong> {venue.venueType}</p>
                                <p><strong>Capacity:</strong> {venue.capacity}</p>
                                <p><strong>Location:</strong> {venue.location}</p>
                                <p><strong>Package:</strong> {venue.venuePackage}</p>
                                <p><strong>Description:</strong> {venue.description}</p>
                                <button 
                                    style={combinedStyle.reserveButton} 
                                    onClick={() => handleReserveClick(venue.id)}>
                                    Reserve
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedImage && (
                <div style={combinedStyle.popupOverlay} onClick={closePopup}>
                    <div style={combinedStyle.popupContent} onClick={(e) => e.stopPropagation()}>
                        <img
                            src={`data:image/jpeg;base64,${selectedImage}`}
                            alt="Venue"
                            style={combinedStyle.popupImage}
                        />
                        <button style={combinedStyle.closeButton} onClick={closePopup}>&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AvailableVenue;
