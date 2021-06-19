import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

GameCard.propTypes = {
  gameData: PropTypes.shape({
    name: PropTypes.string,
    box_art_url: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string
  })
}

export default function GameCard({ gameData }) {

  const {
    name,
    box_art_url,
    description,
    created_at,
    updated_at
  } = gameData;

  // todo create a useParamName hook that returns the param version of a string

  const gameParamName = "grand-theft-auto-v";

  const createdDate = moment(created_at).format("ll LT");
  const updatedDate = moment(updated_at).format("ll LT");

  return (
    <div className="mb-2">
      <a 
        href={`/game/${gameParamName}`}
        className="list-group-item list-group-item-action bg-custom-secondary text-light border-custom-accent"
      >
        <div className="d-flex">
          <div className="w-100 h-auto d-flex flex-column">
              
            <h5 className="mb-1">{name}</h5>
            
            
            <div><p>
              {/* Dynamically display description or 'No description' message */}
              {description === null ? <small className="text-muted"><em>No description</em></small> : description}
            </p></div> 
              
          </div>

          <div className="">
            <img className="img-thumbnail" src={box_art_url} alt={`Box art for ${gameData.name}`} />
          </div>
        </div>
            
        <div className="d-flex flex-wrap mt-1">
          <small className="rounded bg-custom-light w-auto px-2 text-custom-accent text-nowrap m-1">Added on: {createdDate}</small>
          <small className="rounded bg-custom-light w-auto px-2 text-custom-accent text-nowrap m-1">Last updated: {updatedDate}</small>
        </div>

      </a>

    </div>
  )

}
