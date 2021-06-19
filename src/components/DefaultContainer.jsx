import React from 'react';
import { 
  Route, 
  Switch, 
  Redirect, 
} from 'react-router-dom';
import GameIndex from './GameIndex';
import GameDetail from './GameDetail';
import Page404 from './Page404.jsx';
import About from './About.jsx';
import Create from './Create';


export default function DefaultContainer() {
  
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
            <GameIndex />
          </Route>
          <Route path="*">
            <Page404 /> 
          </Route>
        </Switch>

    </div>
  )
}
