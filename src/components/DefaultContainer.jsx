import React from 'react';
import { 
  Route, 
  Switch, 
} from 'react-router-dom';
import GameIndex from './GameIndex';
import Page404 from './Page404.jsx';
import About from './About.jsx';
import Create from './Create';
import PropTypes from 'prop-types';

DefaultContainer.propTypes = {
  userData: PropTypes.shape({
    token: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string
  })
}
export default function DefaultContainer({ userData }) {
  
  return (
    <div className="justify-content-center m-auto" style={{"maxWidth": "700px"}}>
        
        <Switch>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route path="/">
            <GameIndex userData={userData}/>
          </Route>
          <Route path="*">
            <Page404 /> 
          </Route>
        </Switch>

    </div>
  )
}
