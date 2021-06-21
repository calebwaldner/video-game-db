import React, { useState } from 'react';
import PropTypes from 'prop-types';

Login.propTypes = {
  getUserData: PropTypes.func
}

export default function Login({getUserData}) {

  const [ loading, setLoading ] = useState(false);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ requestRejected, setRequestRejected ] = useState(false);
  const [ message, setMessage ] = useState("");


  function login(email, password) {

    setLoading(true);
    
    fetch('http://161.35.15.14/api/tokens', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}),
    })
      .then(res => {
        res.status !== 200 && setRequestRejected(true);
        return res.json()
      })
      .then(res => {
        if (res.token !== undefined) {
          getUserData(res.token)
        } else {
          setMessage(res.message);
        }
      })
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <div className="w-auto d-flex justify-content-center mt-5">
      <div className="container" style={{"maxWidth":"700px"}}>
        <form>
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
                onChange={(e) => {setRequestRejected(false); setEmail(e.target.value)}}
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
                onChange={(e) => {setRequestRejected(false); setPassword(e.target.value)}}
              />
            </div>

            <div className="m-3">
              <button 
                type="submit" 
                className="w-100 text-custom-dark btn btn-custom-accent" 
                fontFamily="Press Start 2P"
                onClick={() => login(email, password)}
                disabled={loading}
              >
                {
                  loading ? (
                    <><span className="spinner-border spinner-border-sm" role="status" aria-hidden={loading} />
                    <span className="ms-2">Loading...</span></>
                    )
                  : "Login"
                }
                
              </button>

              { requestRejected &&
                <p className="m-auto text-danger">{message}</p>
              }
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
