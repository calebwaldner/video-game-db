import React, { 
  useState, 
  useRef,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

Create.propTypes = {
  token: PropTypes.string,
}
export default function Create({ token }) {

  const history = useHistory();

  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ boxArt, setBoxArt ] = useState("");

  function createGame(token, data) {
    fetch(`http://161.35.15.14/api/games`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
      history.push("game/" + result.id);
    })
  }

  function onSubmit(e) {
    e.preventDefault();

    const data = {name: name, box_art_url: boxArt, description: description}
    createGame(token, data)

  }

  const formRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  }, []);

  return (
    <div>
      <form ref={formRef} className="needs-validation" noValidate onSubmit={onSubmit}>
        <div className="mb-3 text-custom-accent">
          <label htmlFor="gameName" className="form-label">Game Name</label>
          <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="gameName" aria-describedby="gameName" required/>
          <div className="invalid-feedback">
            A game name is required.
          </div>
        </div>
        <div className="mb-3 text-custom-accent">
          <label htmlFor="gameDescription" className="form-label">Description</label>
          <textarea onChange={(e) => setDescription(e.target.value)} type="text" className="form-control" rows="5" id="gameDescription"></textarea>
        </div>
        <div className="mb-3 text-custom-accent">
          <label htmlFor="gameBoxArt" className="form-label">Box Art URL</label>
          <input onChange={(e) => setBoxArt(e.target.value)} type="text" className="form-control" id="gameBoxArt" aria-describedby="gameBoxArt" />
        </div>
        <button type="submit" className="btn btn-custom-accent mt-2">Submit</button>
      </form>
    </div>
  )
}
