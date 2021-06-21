import React, { useEffect, useState } from 'react';
import { 
  BrowserRouter, 
  Switch, 
  Route, 
  useHistory,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import DefaultContainer from './components/DefaultContainer';
import Navbar from './components/Navbar';

function App() {

  const history = useHistory();

  const [ appLoading, setAppLoading ] = useState(true);

  const [ userData, setUserData ] = useState({
    token: null,
    id: null,
    name: null,
    email: null
  });

  useEffect(() => {
    if (userData.token !== null) {
      setAppLoading(false)
    } 
  }, [ userData ])

  // Gets token from local storage on refresh
  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) {
      getUserData(JSON.parse(token));
    } else {
      setAppLoading(false);
    }
  }, [])

  // Stores token in local storage on login
  useEffect(() => {
    if (userData.token) {
      localStorage.setItem("user-token", JSON.stringify(userData.token));
    }
  },[userData.token])

  function getUserData(token) {
    fetch('http://161.35.15.14/api/users/me', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
      }
    })
    .then(res => res.json())
    .then(result => {
      setUserData({token: token, ...result})
    })
  }

  function logout(token) {
    fetch('http://161.35.15.14/api/tokens/', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
      }
    })
    .then(res => {
      setUserData({
        token: null,
        id: null,
        name: null,
        email: null
      })
      localStorage.removeItem("user-token");
      history.push("/login");
    })
    .catch(err => console.log(err.message))
  }

  const logThisUserOut = () => logout(userData.token)

  return (
    <>
      <BrowserRouter>
        <div className="container h-100">
          <div className="row">
            <div className="col">
              <header className="d-flex justify-content-center">
                <div>
                  <div className="text-custom-primary d-flex justify-content-center text-center pt-3 mb-3">
                    <h1>Video Game Database</h1>
                  </div>
                  {!appLoading && <Navbar userData={userData} logout={logThisUserOut}/>}
                </div>
              </header>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col justify-content-center">
              {
                appLoading ? 
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-custom-accent" style={{"marginTop": "10rem", width: "6rem", height: "6rem"}}>
                    <span className="visually-hidden" role="status" /> 
                  </div> 
                </div> :
                <Switch>
                  <Route exact path="/login">
                    {/* Logged in users cannot access the '/login' route */}
                    {
                      userData.token === null ?
                      <Login getUserData={ getUserData }/> :
                      <Redirect to="/"/>
                    }
                  </Route>
                  <Route path="/">
                    {/* Only logged in users may move past the '/login' route */}
                    {
                      userData.token === null ? 
                      <Redirect to="/login" /> :
                      <DefaultContainer userData={userData} />
                    }
                  </Route>
                </Switch>
              }
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
