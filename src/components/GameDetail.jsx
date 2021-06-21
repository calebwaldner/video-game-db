import React, { 
  useEffect, 
  useState, 
  useRef, 
} from 'react';
import PropTypes from 'prop-types';
import { 
  Link, 
  useParams,
  useHistory,
} from 'react-router-dom';
import useGame from './hooks/useGame';
import moment from 'moment';

GameDetail.propTypes = {
  dispatch: PropTypes.func,
  GameDateTags: PropTypes.elementType,
  userData: PropTypes.shape({
    token: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string
  })
}
export default function GameDetail({dispatch, userData, GameDateTags}) {

  let { id } = useParams();

  const desRef = useRef(null);
  const history = useHistory();

  const [game, loading, setGame] = useGame(userData.token, id);
  const [createdDate, setCreatedDate] = useState(null);
  const [updatedDate, setUpdatedDate] = useState(null);
  const [boxArtURL, setBoxArtURL] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (game !== undefined) {
      setCreatedDate(moment(game.created_at).format("ll LT"));
      setUpdatedDate(moment(game.updated_at).format("ll LT"));
      setDescriptionEdit(game.description);
    }
  }, [game, setCreatedDate, setUpdatedDate])

  useEffect(() => {
    game !== undefined && game.box_art_url && setBoxArtURL(game.box_art_url.replace(/{width}x{height}/, "604x831"))
  }, [game]);

  function updateGame() {
    setSaving(true);
    fetch("http://161.35.15.14/api/games/" + game.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + userData.token
      }
    })
    .then(async res => {
      const json = await res.json();
      res.status === 200 ? setMessage(<span className="text-white">Description successfully updated</span>) : setMessage(<span className="text-danger">{res.message}</span>)
      return json;
    })
    .then(result => {
      setGame(result)
      setIsEditing(!isEditing);
    })
    .finally(() => setSaving(false));
  }

  function deleteGame() {
    dispatch({type: "show-alert", payload: "The game " + game.name + " has been deleted."});

    fetch("http://161.35.15.14/api/games/" + game.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + userData.token
      }
    })
    .then(res => {
      dispatch({type: "search-url", payload: `http://161.35.15.14/api/games?page[number]=1`})
      history.push("/");
    })
    .catch(() => dispatch({type: "hide-alert"}))
  }



  return (
    <div className="mb-3">
        <div className="d-flex">
          <div className="flex-grow-1">
            <Button />
          </div>
          <div>
            <div className="d-flex">
              <button 
                type="button" 
                className="btn btn-outline-custom-accent mx-2" 
                style={{"border": "none"}}
                onClick={(e) => {
                  if (e.target.innerText === "Edit") {
                    setIsEditing(!isEditing)
                    setMessage(null)
                  } else if (e.target.innerText === "Save") {
                    updateGame();
                  }
                  }}
                data-bs-toggle="button" 
                autoComplete="off"
              >{saving ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden={loading}></span> : isEditing ? "Save" : "Edit"}</button>
              <button 
                type="button" 
                className="btn btn-outline-custom-accent" 
                style={{"border": "none"}}
                onClick={deleteGame}
              >Delete</button>
            </div>
          </div>
        </div>

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
                  <div className="text-white my-2">{message}</div>
                  {!isEditing && 
                    <p 
                      className="text-custom-accent" 
                      style={{whiteSpace: "pre-line"}} 
                      ref={desRef}
                      data-bs-toggle="button">
                      {game.description}
                    </p>
                  }
                  {isEditing && 
                    <textarea 
                      className="form-control mb-2" 
                      style={{height: desRef.current !== null ? desRef.current.clientHeight : "default"}} 
                      onChange={(e) => setDescriptionEdit(e.target.value)}
                      defaultValue={descriptionEdit}
                    ></textarea>}
                </div>
                <div className="col">
                  <div className="row">
                    {
                      game.box_art_url === null ? 
                      <span className="text-custom-secondary"><em>No box art</em></span> :
                      <img 
                      src={boxArtURL}
                      alt="Video game cover"
                      className="img-fluid" />
                    }
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

function Button() {
  return (
    <div>
      <Link to="/" type="button" className="btn btn-outline-custom-accent text-nowrap" style={{"border": "none"}}>&larr;  to search</Link>
    </div>
  )
}
