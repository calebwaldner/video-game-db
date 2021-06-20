// Games index page
// - Landing page after login.
// - Should display a table of all games in the system.
// - Should have an input for real time search to filter the list of games
// - - Use GET /api/games?filter[search]=minecraft to have the API perform the search for you.
// - The API returns 5 games at a time so your table should be paginated.

import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import GameCard from './GameCard';
import GameDetail from './GameDetail';
import useGameList from './hooks/useGameList';

GameDateTags.propTypes = {children: PropTypes.array}
function GameDateTags({children}) {
  return (
    <small className="rounded bg-custom-light w-auto px-2 text-custom-accent text-nowrap m-1 overflow-auto">{children}</small>
  )
}

GameIndex.propTypes = {
  userData: PropTypes.shape({
    token: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string
  })
}
export default function GameIndex({ userData }) {

  const initialState = {
    searchValue: "",
    searchURL: "http://161.35.15.14/api/games?page[number]=1",
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  
  function reducer(prevState, action) {
    switch (action.type) {
      case 'search-change':
        return {...prevState, searchValue: action.payload};
      case 'search-url':
        return {...prevState, searchURL: action.payload};
      default:
        throw new Error("There was a problem with the reducer function");
    }
  }

  const [gameList, loading] = useGameList(userData.token, state.searchURL);

  console.log(gameList)

  useEffect(() => {
    console.log(state.searchValue)
    if (state.searchValue.length > 0) {
      dispatch({type: "search-url", payload: `http://161.35.15.14/api/games?filter[search]=${state.searchValue}`})
    } else {
      dispatch({type: "search-url", payload: initialState.searchURL})
    }
  }, [initialState.searchURL, state.searchValue])

  return (
    <div>

      <div className="container">

        <Switch>

          <Route path="/game/:id">
            <GameDetail userData={userData} GameDateTags={GameDateTags}/>
          </Route>

          <Route path="/">
            <div className="mt-2 mb-4">
              <div>
                <input 
                  className="form-control" 
                  onChange={(e) => {
                      dispatch({type: "search-change", payload: e.target.value})
                    }}
                  placeholder="Type to search..." />
              </div>
            </div>

            {loading || gameList === undefined ? 
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-custom-accent" style={{"marginTop": "3rem", width: "3rem", height: "3rem"}}>
                <span className="visually-hidden" role="status" /> 
              </div> 
            </div> : 
              gameList.data.map(game => <GameCard key={game.id} GameDateTags={GameDateTags} gameData={game}></GameCard>)
            }
          </Route>

        </Switch>
    
      </div>
      
      
    </div>
  )
}
