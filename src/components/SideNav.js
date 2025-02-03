import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { RoleContext } from "../contexts/RoleContext";
import { useContext } from "react";
import logo from '../suzalogo.jpg';

function SideNav() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');


    const storedRole = localStorage.getItem('role');

    if (storedUser) {
      const myuser = JSON.parse(storedUser)
      setRole(myuser.role[0].roleName);

    }


    // const storedClientId = localStorage.getItem('clientId');
    const storedSelectedVenueId = localStorage.getItem('selectedVenueId');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data
    }
    if (storedRole) {
      setRole(storedRole); // Set role from localStorage
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('clientId');
    localStorage.removeItem('selectedVenueId');

    // Set user and role state to null
    setUser(null);
    setRole(null);
    setClientId(null);
    setSelectedVenueId(null);

    // Redirect to login page
    navigate('/login'); // Use navigate to redirect
  };

  return (
    <div>

      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img src={logo} alt="Suza Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">Suza Hotel System</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              {/* Use FontAwesome user icon here */}

              <i className="fas fa-user-circle fa-2x" style={{ color: '#fff' }}></i>

            </div>

            <div className="info">
              {/* Display first and last name from the user data */}
              {user ? (
                <a href="#" className="d-block">
                  {user.userFirstName} {user.userLastName}
                </a>
              ) : (
                <a href="#" className="d-block">
                  User Name
                </a>
              )}
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

              {role === "Admin" && <>
                <li className="nav-item menu-open">
                  <a href="#" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Dashboard
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/contents/home" className="nav-link active">
                        <i className="far fa-circle nav-icon" />
                        <p>Dashboard v1</p>
                      </a>
                    </li>
                  </ul>
                </li>

              </>
              }

              {role === "Client" && <>

                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-table" />
                    <p>
                      Reserve
                      <i className="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/contents/availableHotels" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Hotels
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/contents/availableVenue" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Venues
                        </p>
                      </Link>
                    </li>

                  </ul>
                  <li className="nav-item">
                    <Link to="/contents/myReservations" className="nav-link">
                      <i className="nav-icon fas fa-th" />
                      <p>
                        My Reservations
                      </p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/contents/website" className="nav-link">
                      <i className="nav-icon fas fa-th" />
                      <p>
                        Payment
                      </p>
                    </Link>
                  </li>
                </li>

              </>
              }


              {role === "Admin" && <>
                <li className="nav-header">MANAGE</li>

                <li className="nav-item">
                <a href="#" className="nav-link">
  <i className="nav-icon fas fa-plus" />
  <p>
    Add Service
    <i className="fas fa-angle-left right" />
  </p>
</a>

                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/contents/addHotel" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Hotel
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/contents/addVenue" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Venues
                        </p>
                      </Link>
                    </li>

                  </ul>
                </li>

                <li className="nav-item">
                <a href="#" className="nav-link">
  <i className="nav-icon fas fa-tasks" />
  <p>
    Manage service
    <i className="fas fa-angle-left right" />
  </p>
</a>

                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/contents/hotelTable" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Hotels
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/contents/VenueTable" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Venues
                        </p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                    <Link to="/contents/manageTable" className="nav-link">
                      <i className="nav-icon fas fa-th" />
                      <p>
                        Manage Reservations
                      </p>
                    </Link>
                  </li>
                <li className="nav-item">
                  <a href="pages/kanban.html" className="nav-link">
                    <i className="nav-icon fas fa-columns" />
                    <p>
                      Report
                    </p>
                  </a>
                </li>


              </>}



              <li className="nav-item">
                <a href="pages/gallery.html" className="nav-link">
                  <i className="nav-icon fas fa-cog" />
                  <p>
                    Settings
                  </p>
                </a>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link" onClick={handleLogout}>
                  <i className="nav-icon fas fa-sign-out-alt" />
                  <p>Logout</p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>


  );
}

export default SideNav;
