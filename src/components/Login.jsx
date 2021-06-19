// Login page
// - Should accept an email and password.
// - Reject invalid login attempts.

import React from 'react';

export default function Login() {
  return (
    <div className="w-auto d-flex justify-content-center mt-5">
      <div className="container" style={{"max-width":"700px"}}>
        <div className="d-flex flex-column">
          <div className="m-3">
            <label 
              htmlFor="email" 
              className="form-label text-custom-accent"
            >
              Email:
            </label> 
            <input 
              id="email"
              type="text" 
              className="form-control" 
              placeholder="zelda@hyrule.com" 
            />
          </div>

          <div className="m-3">
            <label 
              htmlFor="password" 
              className="form-label text-custom-accent"
            >
              Password:
            </label> 
            <input 
              type="password" 
              className="form-control" 
              id="password"
            />
          </div>

          <div className="m-3">
            <button type="button" className="w-100 text-custom-dark btn btn-custom-accent" fontFamily="Press Start 2P" >Login</button>
          </div>

        </div>
      </div>
    </div>
  )
}
