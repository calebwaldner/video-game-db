// Page dedicated to displaying details about one individual game.
// Users should also be able to update the game on this page as well.

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

GameDetail.propTypes = {
  gameData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    box_art_url: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  })
}

export default function GameDetail({ gameData }) {
  return (
    <div>
      <BackButton />

      <div className="container mt-3">
        <div className="row">
          <div className="column">
            <div className="row">
              <h2 className="text-light">The Cool Game</h2>
            </div>
              <div className="row">
                <div className="col-8">
                  <p className="text-custom-accent">This is the games description</p>
                </div>
                <div className="col">
                  <img src={`https://static-cdn.jtvnw.net/ttv-boxart/Grand%20Theft%20Auto%20V-{width}x{height}.jpg`} alt="" />
                </div>
              </div>

          </div>
        </div>
      </div>

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
