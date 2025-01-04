import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Hoteli.css';

const combinedStyle = {
    header: {
        backgroundColor: '#003580',
        color: '#fff',
        padding: '15px 0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    contentContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
    },
    logo: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#fff',
        cursor: 'pointer',
    },
    nav: {
        flex: 1,
        textAlign: 'center',
    },
    navList: {
        listStyle: 'none',
        margin: '0',
        padding: '0',
        display: 'inline-flex',
    },
    navItem: {
        margin: '0 15px',
    },
    navLink: {
        textDecoration: 'none',
        color: '#fff',
        fontWeight: '500',
        padding: '10px 15px',
        borderRadius: '4px',
        transition: 'background-color 0.3s, color 0.3s',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
    },
    loginLink: {
        textDecoration: 'none',
        color: '#fff',
        fontWeight: '500',
        display: 'inline-flex',
        alignItems: 'center',
        padding: '10px 20px',
        margin: '2px',
        border: '1px solid #fff',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        transition: 'background-color 0.3s, color 0.3s',
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
        borderRadius: '8px',
    },
    starRating: {
        fontSize: '20px',
        color: '#f39c12',
    },
};

const Hoteli = () => {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost:9090/hotel');
                setHotels(response.data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHotels();
    }, []);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // Get the whole number of stars
        const emptyStars = 5 - fullStars; // Remaining stars to make up 5

        return (
            <>
                {Array(fullStars).fill('★').map((_, index) => (
                    <span key={`full-${index}`} style={combinedStyle.starRating}>★</span>
                ))}
                {Array(emptyStars).fill('☆').map((_, index) => (
                    <span key={`empty-${index}`} style={combinedStyle.starRating}>☆</span>
                ))}
            </>
        );
    };


    return (
        <>
            <header style={combinedStyle.header}>
                <div style={combinedStyle.contentContainer}>
                    <div style={combinedStyle.logo}>Hotel System</div>
                    <nav style={combinedStyle.nav}>
                        <ul style={combinedStyle.navList}>
                            <li style={combinedStyle.navItem}><a href="/" style={combinedStyle.navLink}>Home</a></li>
                            <li style={combinedStyle.navItem}><a href="/about" style={combinedStyle.navLink}>About Us</a></li>
                            <li style={combinedStyle.navItem}><a href="/homeVenue" style={combinedStyle.navLink}>Venues</a></li>
                            <li style={combinedStyle.navItem}><a href="/hoteli" style={combinedStyle.navLink}>Hotels</a></li>
                            <li style={combinedStyle.navItem}><a href="/contact" style={combinedStyle.navLink}>Contact</a></li>
                        </ul>
                    </nav>
                    <div style={combinedStyle.rightSection}>
                        <a href="/register" style={combinedStyle.loginLink}>Register</a>
                        <a href="/login" style={combinedStyle.loginLink}>Login</a>
                    </div>
                </div>
            </header>

            <div style={combinedStyle.home}>
                <h1>Available Hotels</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={combinedStyle.hotelsGrid}>
                        {hotels.map((hotel) => (
                            <div key={hotel.id} style={combinedStyle.hotelCard}>
                                <img
                                    src={`http://localhost:9090/hotel/${hotel.id}/image`}
                                    alt={hotel.hotelName}
                                    style={combinedStyle.hotelImage}
                                />
                                <h2>{hotel.hotelName}</h2>
                                <p><strong>Location:</strong> {hotel.location}</p>
                                <p><strong>Price:</strong> ${hotel.price}</p>
                                <p> {renderStars(hotel.rating)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Hoteli;
