import React from 'react';
import { useLocation } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const { recommendedData, scores } = location.state;

  return (
    <div>
      <h1>Test Results</h1>
      <h2>Score: {scores}</h2>
      <h3>Recommended Resources</h3>
      <ul>
        {recommendedData.map(([resource, rating], index) => (
          <li key={index}>
            <strong>Resource:</strong> {resource} <br />
            <strong>Rating:</strong> {rating}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultPage;
