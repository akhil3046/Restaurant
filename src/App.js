// App.js
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const URL = 'https://server-y2dt.onrender.com'
  const [details, setDetails] = useState({
    name: '',
    questions: [
      'How satisfied were you with the overall dining experience at our restaurant?',
      'How would you rate the quality of food served during your visit?',
      'Did our staff provide attentive and friendly service throughout your visit?',
      'Were you pleased with the ambiance and cleanliness of our restaurant?',
      'Do you have any suggestions or comments for us to improve your future dining experiences with us?',
    ],
    newQuestion: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const addRestaurant = (e) => {
    if (e.target.value === 'Submit') {
      setSubmitted(true)
      const updatedDetails = { ...details };
      updatedDetails.questions.push(details.newQuestion);
      setDetails(updatedDetails);
      axios.post('/new', details);
    }
    setShow(!show);
    setDetails({...details, newQuestion: ''})
  };

  const handleSubmit = () => {
    if (!submitted) {
      axios.post(URL+'/new', details);
    }
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="App">
      <div className="form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={details.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Restaurant name"
          />
        </div>
        {details.questions &&
          details.questions.map((question, index) => (
            <div className="form-check" key={index}>
              <label className="form-check-label">{question}</label>
            </div>
          ))}
        {show && (
          <input
            type="text"
            className="form-control"
            placeholder="Enter New Question"
            name="newQuestion"
            value={details.newQuestion}
            onChange={handleChange}
          />
        )}
        <br></br>
        <button
          className="btn btn-primary"
          value={show ? 'Submit' : 'Add Question'}
          onClick={addRestaurant}
        >
          {show ? 'Add' : 'Add Question'}
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={handleSubmit}
          style={{ marginLeft: '5px' }}
        >
          {'Submit'}
        </button>
      </div>
    </div>
  );
}

export default App;
