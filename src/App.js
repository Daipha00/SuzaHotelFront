import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Routes>
          <Route
            path="/homeVenue"
            element={<HomeVenue />}  
          />

<Route
            path="/hoteli"
            element={<Hoteli />}  
          />
          <Route
            path="/login"
            element={<Login />}  
          />
          <Route
            path="/register"
            element={<Register />}  
          />
          <Route path='/rTable' element={<RTable />} />

<Route path='/roomTable' element={<RoomTable />} />
        
          <Route
            path="*"
            element={
              <>
                <Header />
                <SideNav />
                <div className="content">
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path='/rTable' element={<RTable />} />
                    <Route path="/addVenue" element={<AddVenue />} />
                    <Route path="/venueTable" element={<VenueTable />} />
                    <Route path='/hotelTable' element={<HotelTable />} />
                    <Route path = '/addHotel' element={<AddHotel/>}/>
                  </Routes>
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
