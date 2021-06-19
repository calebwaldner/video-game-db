import React from 'react';
import { 
  BrowserRouter, 
  Switch, 
  Route, 
} from "react-router-dom";
import Login from "./components/Login";
import DefaultContainer from './components/DefaultContainer';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="container h-100">
        <div className="row">
          <div className="col">
            <header className="d-flex justify-content-center">
              <Navbar />
            </header>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col justify-content-center">
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route path="/">
                <DefaultContainer />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
