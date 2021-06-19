import React from 'react';
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

  // todo create a useParamName hook that returns the param version of a string

  const createdDate = moment(created_at).format("ll LT");
  const updatedDate = moment(updated_at).format("ll LT");

  return (
    <div className="mb-2">
      <Link 
        to={`/game/${id}`}
        className="list-group-item list-group-item-action bg-custom-secondary text-light border-custom-accent"
      >
        <div className="d-flex">
          <div className="w-100 h-auto d-flex flex-column">
              
            <h5 className="mb-1">{name}</h5>
            
            <div>
              <p>
                {/* Dynamically display description or 'No description' message */}
                {description === null ? <small className="text-muted"><em>No description</em></small> : description}
              </p>
            </div>
              
          </div>

          <div className="">
            <img className="img-thumbnail" src={box_art_url} alt={`Box art for ${gameData.name}`} />
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
