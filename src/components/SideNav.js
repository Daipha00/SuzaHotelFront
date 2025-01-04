import React from "react"
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div>

      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img src="./suzalogo.jpg" alt="Suza Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">Suza Hotel System</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="#" className="d-block">Alexander Pierce</a>
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
                    <a href="./home" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Dashboard v1</p>
                    </a>
                  </li>

                </ul>
              </li>
              <li className="nav-item">
                <Link to="/website" className="nav-link">
                  <i className="nav-icon fas fa-th" />
                  <p>
                    Availability
                  </p>
                </Link>
              </li>

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
                    <a href="pages/tables/simple.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Hotels</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to="/website" className="nav-link">
                      <i className="nav-icon fas fa-th" />
                      <p>
                        My Reservations
                      </p>
                    </Link>
                  </li>

                </ul>
                <li className="nav-item">
                  <Link to="/website" className="nav-link">
                    <i className="nav-icon fas fa-th" />
                    <p>
                      My Reservations
                    </p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/website" className="nav-link">
                    <i className="nav-icon fas fa-th" />
                    <p>
                      Payment
                    </p>
                  </Link>
                </li>
              </li>
              <li className="nav-header">MANAGE</li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon far fa-envelope" />
                  <p>
                    Add Service
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                <li className="nav-item">
                    <Link to="/addHotel" className="nav-link">
                      <i className="nav-icon fas fa-th" />
                      <p>
                        Hotel
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/addVenue" className="nav-link">
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
                  <i className="nav-icon fas fa-search" />
                  <p>
                    Manage service
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/hotelTable" className="nav-link">
                      <i className="nav-icon fas fa-th" />
                      <p>
                        Hotels
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/VenueTable" className="nav-link">
                      <i className="nav-icon fas fa-th" />
                      <p>
                        Venues
                      </p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="pages/gallery.html" className="nav-link">
                  <i className="nav-icon far fa-image" />
                  <p>
                    Settings
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/kanban.html" className="nav-link">
                  <i className="nav-icon fas fa-columns" />
                  <p>
                    Report
                  </p>
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
