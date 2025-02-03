import React, { useState, useEffect } from "react";
import axios from "axios";


// Modal component to display images
const ImageModal = ({ images, onClose }) => {
  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button onClick={onClose} style={modalStyles.closeBtn}>Close</button>
        <h3>Room Images</h3>
        <div style={modalStyles.imagesContainer}>
          {images.map((image, index) => (
            <img
              key={index}
              src={`data:image/jpeg;base64,${image}`}
              alt={`Room Image ${index + 1}`}
              style={modalStyles.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const RoomTable = ({ hotelId }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [roomImages, setRoomImages] = useState([]);

  // Fetch rooms by hotelId
  useEffect(() => {
    if (!hotelId) return;

    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/room/hotel/${hotelId}`);
        setRooms(response.data);
      } catch (err) {
        setError("Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  // Handle image modal visibility
  const handleImageModal = async (roomId) => {
    try {
      const response = await axios.get(`/room/${roomId}/images`, { responseType: 'arraybuffer' });
      const imagesBase64 = response.data.map(imageData => {
        return Buffer.from(imageData, 'binary').toString('base64');
      });
      setRoomImages(imagesBase64);
      setImageModalVisible(true);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  const closeImageModal = () => {
    setImageModalVisible(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Rooms for Hotel ID: {hotelId}</h1>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Room Type</th>
            <th>Pax</th>
            <th>Description</th>
            <th>Images</th> {/* Added column for images */}
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.roomType}</td>
              <td>{room.pax}</td>
              <td>{room.description}</td>
              <td>
                {/* Image icon that triggers modal on click */}
                <button onClick={() => handleImageModal(room.id)}>
                  <img
                    src={`data:image/jpeg;base64,${room.imageIds[0]}`}
                    alt="Room icon"
                    style={{ width: "30px", height: "30px" }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {imageModalVisible && (
        <ImageModal images={roomImages} onClose={closeImageModal} />
      )}
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxHeight: '80%',
    overflowY: 'auto',
  },
  closeBtn: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  imagesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  image: {
    width: '100px',
    height: '100px',
    margin: '5px',
  },
};

export default RoomTable;
