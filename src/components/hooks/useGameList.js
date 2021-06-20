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

    // fetch(`http://161.35.15.14/api/games?page%5Bnumber%5D=2`, {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     "Authorization": "Bearer " + token
    //   }
    // })
    // .then(res => res.json())
    // .then(result => {
    //   console.log(result)
    // })

    // fetch(`http://161.35.15.14/api/games?filter[search]=the`, {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     "Authorization": "Bearer " + token
    //   }
    // })
    // .then(res => res.json())
    // .then(result => {
    //   console.log(result)
    // })

    // fetch(`http://161.35.15.14/api/games/7`, {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     "Authorization": "Bearer " + token
    //   }
    // })
    // .then(res => res.json())
    // .then(result => {
    //   console.log(result)
    // })

  }, [token, url]);

  return [gameList, loading];
}
