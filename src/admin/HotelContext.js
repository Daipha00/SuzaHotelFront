import React, { createContext, useContext, useState } from "react";

const HotelContext = createContext();

export const useHotel = () => useContext(HotelContext);

export const HotelProvider = ({ children }) => {
  const [hotelId, setHotelId] = useState(null);

  return (
    <HotelContext.Provider value={{ hotelId, setHotelId }}>
      {children}
    </HotelContext.Provider>
  );
};
