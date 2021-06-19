import React from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

export default function Navbar() {

  const location = useLocation();

  return (
    <div>
      <div className="text-custom-primary d-flex justify-content-center text-center pt-3 mb-3">
        <h1>Video Game Database</h1>
      </div>

      <div className="menu mr-auto mb-3">
        {location.pathname !== "/login" && (
          <nav className="navbar navbar-expand-lg navbar-light bg-custom-light rounded">
            <div className="container-fluid">
              <span className="navbar-brand text-custom-dark">Greetings, Caleb!</span>
              <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              {/* <div className="flex-grow-1">{" "}</div> */}
              <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link" exact to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/create">Create</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </div>
      
    </div>
  )
}
