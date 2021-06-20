// Page dedicated to displaying details about one individual game.
// Users should also be able to update the game on this page as well.

import React, { 
  useEffect, 
  useState 
} from 'react';
import PropTypes from 'prop-types';
import { 
  Link, 
  useParams,
} from 'react-router-dom';
import useGame from './hooks/useGame';
import moment from 'moment';

// GameDetail.propTypes = {
//   gameData: PropTypes.shape({
//     id: PropTypes.string,
//     name: PropTypes.string,
//     box_art_url: PropTypes.string,
//     description: PropTypes.string,
//     created_at: PropTypes.string,
//     updated_at: PropTypes.string,
//   })
// }

GameDetail.propTypes = {
  GameDateTags: PropTypes.elementType,
  userData: PropTypes.shape({
    token: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string
  })
}
export default function GameDetail({userData, GameDateTags}) {

  let { id } = useParams();

  const [game, loading] = useGame(userData.token, id);
  const [createdDate, setCreatedDate] = useState(null);
  const [updatedDate, setUpdatedDate] = useState(null);
  const [boxArtURL, setBoxArtURL] = useState("");

  useEffect(() => {
    if (game !== undefined) {
      setCreatedDate(moment(game.created_at).format("ll LT"));
      setUpdatedDate(moment(game.updated_at).format("ll LT"));
    }
  }, [game, setCreatedDate, setUpdatedDate])

  useEffect(() => {
    game !== undefined && setBoxArtURL(game.box_art_url.replace(/{width}x{height}/, "300x413"))
  }, [game])


  return (
    <div>
      <BackButton />

      {
        loading || game === undefined ? 
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-custom-accent" style={{"marginTop": "3rem", width: "3rem", height: "3rem"}}>
            <span className="visually-hidden" role="status" /> 
          </div> 
        </div> :
        <div className="container mt-3">
          <div className="row">
            <div className="column">
              <div className="row">
                <h2 className="text-light">{game.name}</h2>
              </div>
              <div className="row">
                <div className="col-8 w-100">
                  <p className="text-custom-accent">{game.description}</p>
                </div>
                <div className="col">
                  <div className="row">
                    <img 
                    src={boxArtURL}
                    alt="Video game cover"
                    className="img-fluid" />
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <GameDateTags>Added on: {createdDate}</GameDateTags>
                <GameDateTags>Last updated: {updatedDate}</GameDateTags>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

function BackButton() {
  return (
    <div>
      <Link to="/" type="button" className="btn btn-outline-custom-accent" style={{"border": "none"}}>&larr; Back to search</Link>
    </div>
  )
}
