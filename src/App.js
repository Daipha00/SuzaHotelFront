import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { RoleProvider } from './contexts/RoleContext';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import SideNav from './components/SideNav';
import AddVenue from './admin/AddVenue';
import VenueTable from './admin/VenueTable';
import HomeVenue from './website/HomeVenue';
import Hoteli from './website/Hoteli';
import Login from './clints/Login';
import Register from './clints/Register';
import HotelTable from './admin/HotelTable';
import AddHotel from './admin/AddHotel';
import RoomTable from './admin/RoomTable';
import RTable from './admin/RTable';
import AvailableVenue from './clints/AvailableVenue';
import Reservation from './clints/reservation';
import MyReservations from './clints/MyReservations';
import AvailableHotels from './clints/AvailableHotels';
import ExtendedHotel from './website/ExtendedHotel';
import ExtendedVenue from './website/ExtendedVenue';
import AddRoom from './admin/AddRoom';
import { HotelProvider } from './admin/HotelContext';
import AvailableRooms from './clints/AvailableRooms';
import RoomReservation from './clints/RoomReservation';
import ExtendedManageTable from './admin/ExtendedManageTable';
import ManageTable from './admin/ManageTable';
import ReservationById from './admin/ReservationById';

function App() {
  return (
    <RoleProvider>
    <Router>
      <div className="wrapper">
        <Routes>
          <Route
            path=""
            element={<HomeVenue />}
          />

          <Route
            path="/hoteli"
            element={<Hoteli />}
          />
          <Route path="/hotel/:hotelId" element={<ExtendedHotel />} />
          <Route path="/venue/:venueId" element={<ExtendedVenue />} />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/contents/*"
            element={
              <>
                <Header />
                <SideNav />
                <div className="content">
                <HotelProvider>
                  <Routes>
                  <Route path="/availableRooms/:hotelId" element={<AvailableRooms />} />
                    <Route path="/home" element={<Home />} />
                   <Route path='/addRoom' element={<AddRoom />} />
                    <Route path='/rTable' element={<RTable />} />
                    <Route path='/hotelTable' element={<HotelTable />} />
                    <Route path='/myReservations' element={<MyReservations />} />
                    <Route path="/addVenue" element={<AddVenue />} />
                    <Route path="extendedManageTable" element={<ExtendedManageTable />} />
                    <Route path="/manageTable" element={<ManageTable/>}/>
                    <Route path="/venueTable" element={<VenueTable />} />
                    <Route path='/addHotel' element={<AddHotel />} />
                    <Route path='/availableVenue' element={<AvailableVenue />} />
                    <Route path='/availableHotels' element={<AvailableHotels />} />
                    <Route path='/reservation' element={<Reservation />} />
                    <Route path='/roomReservation' element={<RoomReservation />} />
                    <Route path="/reservationById/:reservationId" element={<ReservationById />} />
                  </Routes>

                  </HotelProvider>
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
    </RoleProvider>
  );
}

export default App;
