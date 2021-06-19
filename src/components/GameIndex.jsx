// Games index page
// - Landing page after login.
// - Should display a table of all games in the system.
// - Should have an input for real time search to filter the list of games
// - - Use GET /api/games?filter[search]=minecraft to have the API perform the search for you.
// - The API returns 5 games at a time so your table should be paginated.

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import GameCard from './GameCard';
import GameSearch from './GameSearch';
import GameDetail from './GameDetail';


const gameData = {
  id: 1,
  name: "Grand Theft Auto V",
  box_art_url: "https:\/\/static-cdn.jtvnw.net\/ttv-boxart\/Grand%20Theft%20Auto%20V-{width}x{height}.jpg",
  description: "this is the game",
  created_at: "2021-04-26T22:45:48.000000Z",
  updated_at: "2021-04-26T22:45:48.000000Z"
}

export default function GameIndex() {

  GameDateTags.propTypes = {children: PropTypes.array}
  function GameDateTags({children}) {
    return (
      <small className="rounded bg-custom-light w-auto px-2 text-custom-accent text-nowrap m-1">{children}</small>
    )
  }

  return (
    <div>

      <div className="container">

        <Switch>

          <Route path="/game/:id">
            <GameDetail />
          </Route>

          <Route path="/">
            <GameSearch></GameSearch>
            <GameCard GameDateTags={GameDateTags} gameData={gameData}></GameCard>
            <GameCard GameDateTags={GameDateTags} gameData={gameData}></GameCard> 
            <GameCard GameDateTags={GameDateTags} gameData={gameData}></GameCard> 
            <GameCard GameDateTags={GameDateTags} gameData={gameData}></GameCard> 
          </Route>

        </Switch>
    
      </div>
      
      
    </div>
  )
}
