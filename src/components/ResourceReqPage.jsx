import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ResourceReqPage.css'; // Import updated CSS for styling

function ResourceReqPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [inputLink, setInputLink] = useState('');
  const [inputRating, setInputRating] = useState('');

  // Handle adding a new link and its rating
  const addLink = () => {
    if (inputLink.trim() !== '' && inputRating !== '') {
      setLinks([...links, inputLink.trim()]);
      setRatings([...ratings, parseInt(inputRating)]);
      setInputLink(''); // Clear input fields
      setInputRating('');
    }
  };

  // Handle submission to save links and ratings, then navigate to TestPage
  const handleSubmit = () => {
    localStorage.setItem('studyMaterials', JSON.stringify(links));
    localStorage.setItem('ratings', JSON.stringify(ratings));
    navigate(`/test/${taskId}`);
  };

  return (
    <div class="card">
      <div class="card-info">
    <div className="overlay">
      <div className="popup">
        <h2>Optional: Add Study Material Links and Ratings</h2>
        <input
          type="text"
          placeholder="Enter link"
          value={inputLink}
          onChange={(e) => setInputLink(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter rating"
          value={inputRating}
          onChange={(e) => setInputRating(e.target.value)}
        />
        <button className="add-button" onClick={addLink}>
          Add Link and Rating
        </button>
        <button className="submit-button" onClick={handleSubmit}>
          Submit and Start Test
        </button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default ResourceReqPage;