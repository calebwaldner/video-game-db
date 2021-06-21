import { useState, useEffect } from 'react'

export default function useGameList(token, url) {
  
  const [ gameList, setGameList ] = useState();
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
      }
    })
    .then(res => res.json())
    .then(result => {
      setGameList(result);
      setLoading(false)
    })

  }, [token, url]);

  return [gameList, loading];
}
