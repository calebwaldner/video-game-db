import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

GameCard.propTypes = {
  GameDateTags: PropTypes.elementType,
  gameData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    box_art_url: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string
  })
}

export default function GameCard({ GameDateTags, gameData }) {

  const {
    id,
    name,
    box_art_url,
    description,
    created_at,
    updated_at
  } = gameData;

  const [createdDate, setCreatedDate] = useState(null);
  const [updatedDate, setUpdatedDate] = useState(null);
  const [boxArtURL, setBoxArtURL] = useState("");

  useEffect(() => {
    if (gameData !== undefined) {
      setCreatedDate(moment(created_at).format("ll LT"));
      setUpdatedDate(moment(updated_at).format("ll LT"));
    }
  }, [created_at, gameData, updated_at])

  useEffect(() => {
    gameData !== undefined && gameData.box_art_url && setBoxArtURL(box_art_url.replace(/{width}x{height}/, "138x190"))
  }, [box_art_url, gameData])

  return (
    <div className="mb-2">
      <Link 
        to={`/game/${id}`}
        className="list-group-item list-group-item-action bg-custom-secondary text-light border-custom-accent rounded"
      >
        <div className="d-flex">
          <div className="w-100 h-auto d-flex flex-column">
              
            <h5 className="mb-1">{name}</h5>
            
            <div className="row justify-content-between">
              <div className="col-8 d-flex flex-grow-1">
                <p>
                  {/* Dynamically display description or 'No description' message */}
                  {description === null ? <small className="text-muted"><em>No description</em></small> : description}
                </p>
              </div>
              <div className="col-4 w-auto">
                    {
                      gameData.box_art_url === null ? 
                      "" :
                      <img className="img-thumbnail" src={boxArtURL} alt={`Box art for ${gameData.name}`} />
                    }
              </div>
            </div>
              
          </div>
        </div>
            
        <div className="d-flex flex-wrap mt-1">
          <GameDateTags>Added on: {createdDate}</GameDateTags>
          <GameDateTags>Last updated: {updatedDate}</GameDateTags>
        </div>

      </Link>

    </div>
  )

}
