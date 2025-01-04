import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeVenue.css';

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
    venuesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    venueCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        textAlign: 'center',
        marginTop: '30px',
    },
    venueImage: {
        width: '100%',
        borderRadius: '8px',
    },
    popupOverlay: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000',
    },
    popupContent: {
        position: 'relative',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
    },
    popupImage: {
        width: '100%',
        maxHeight: '80vh',
        objectFit: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
    },
};

const HomeVenue = () => {
    const [venues, setVenues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

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

    const openPopup = (image) => {
        setSelectedImage(image);
    };

    const closePopup = () => {
        setSelectedImage(null);
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
        </>
    );
};

export default HomeVenue;
