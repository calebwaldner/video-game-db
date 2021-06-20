import { useState, useEffect } from 'react'

export default function useGame(token, id) {
  
  const [ game, setGame ] = useState();
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://161.35.15.14/api/games/" + id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
      }
    })
    .then(res => res.json())
    .then(result => {
      setGame(result);
      setLoading(false)
    })

  }, [id, token]);

  return [game, loading];
}
