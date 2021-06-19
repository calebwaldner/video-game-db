// Page dedicated to displaying details about one individual game.
// Users should also be able to update the game on this page as well.

import React from 'react';
import { useParams } from 'react-router';

export default function GameDetail() {
  const { game } = useParams();
  return (
    <div>
      <p className="text-custom-accent">game detail page</p>
      <p className="text-white">{game}</p>
    </div>
  )
}
