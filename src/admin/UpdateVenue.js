import axios from "axios";

const updateVenue = async (id, updatedData) => {
  try {
    const formData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await axios.put(`http://localhost:9090/venue/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Update the venue in the local state after successful API call
    setVenues((prevVenues) =>
      prevVenues.map((venue) => (venue.id === id ? response.data : venue))
    );
  } catch (error) {
    console.error("Error updating venue:", error);
  }
};
