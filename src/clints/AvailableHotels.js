import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AvailableHotels() {
    const [isLoading, setIsLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost:9090/hotel');
                const hotelsWithImages = await Promise.all(
                    response.data.map(async (hotel) => {
                        const imageResponse = await axios.get(
                            `http://localhost:9090/hotel/${hotel.id}/image`,
                            { responseType: 'arraybuffer' }
                        );
                        const base64Image = await convertToBase64(imageResponse.data);
                        return { ...hotel, image: base64Image };
                    })
                );
                setHotels(hotelsWithImages);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHotels();
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

    const handleAvailabilityClick = (hotelId) => {
        localStorage.setItem('hotelId', hotelId);
        console.log(`hotelId: ${hotelId}`); // Log to confirm
        
        navigate(`/contents/availableRooms/${hotelId}`); // Navigate to the AvailableRooms page
    };

    const combinedStyle = {
        home: {
            padding: '20px',
            textAlign: 'center',
            marginLeft: '250px',
        },
        hotelsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginTop: '20px',
        },
        hotelCard: {
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            textAlign: 'center',
        },
        hotelImage: {
            width: '100%',
            height: 'auto',
            cursor: 'pointer',
            borderRadius: '8px',
        },
    };

    return (
        <div>
            <div style={combinedStyle.home}>
                <h1>Available Hotels</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={combinedStyle.hotelsGrid}>
                        {hotels.map((hotel) => (
                            <div key={hotel.id} style={combinedStyle.hotelCard}>
                                <img
                                    src={`data:image/jpeg;base64,${hotel.image}`}
                                    alt={hotel.hotelName}
                                    style={combinedStyle.hotelImage}
                                />
                                <h2>{hotel.hotelName}</h2>
                                <p><strong>Location:</strong> {hotel.location}</p>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleAvailabilityClick(hotel.id)}
                                >
                                    See Availability
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AvailableHotels;
