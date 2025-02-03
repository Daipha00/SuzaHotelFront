import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../website/ExtendedHotel.css"; // Import CSS for styling
import { useNavigate } from 'react-router-dom';

const combinedStyle = {
    home: {
        padding: '20px',
        marginLeft: '250px',
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
        height: '200px',
        borderRadius: '8px',
        objectFit: 'cover',
    },
};

const AvailableRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const hotelId = localStorage.getItem('hotelId');
        console.log(`Hotel ID from local storage: ${hotelId}`);
        if (!hotelId) {
            console.error('No hotelId found in local storage.');
            return;
        }        
    
        const fetchRooms = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/room/hotel/${hotelId}`);
                console.log('Rooms fetched:', response.data); // Debug log
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching Rooms:', error.response?.data || error.message); // Detailed error logging
            } finally {
                setIsLoading(false);
            }
        };
    
        if (hotelId) fetchRooms();
    }, []);

    const handleReserve = (roomId) => {
        const hotelId = localStorage.getItem('hotelId');
        const clientId = localStorage.getItem('clientId'); // Ensure clientId is stored in localStorage
        if (!hotelId || !clientId) {
            console.error("No hotelId or clientId found in local storage.");
            return;
        }
    
        // Store the roomId and clientId in localStorage before navigating
        localStorage.setItem('roomId', roomId);
        localStorage.setItem('clientId', clientId);
    
        // Navigate to the reservation page with state
        navigate('/contents/roomReservation', { state: { roomId, hotelId } });
    };
    
    

    return (
        <div className="extended-hotel-container">
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
                                <p><strong>Pax:</strong> {room.pax}</p>
                                <p><strong>Description:</strong> {room.description}</p>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleReserve(room.id)}
                                >
                                   Reserve Now
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailableRooms;
