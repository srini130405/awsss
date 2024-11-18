

import React from 'react';
import { useLocation } from 'react-router-dom';
import './ResultPage.css';

function ResultPage() {
  const location = useLocation();
  const { recommendedData, scores } = location.state;

  return (
    <div className="result-container">
      <div className="content-wrapper">
     

        <h1 className="title">Test Results</h1>
        
        <p className="score-text">
          You scored {scores}% on the test. Here are some resources to help you improve.
        </p>

        <h2 className="resources-title">Recommended Resources</h2>
        
        <div className="resource-list">
          {recommendedData.map(([resource, rating], index) => (
            <div key={index} className="resource-item">
              <div className="resource-image" />
              
              <div className="resource-details">
                <h3 className="resource-title">{resource}</h3>
                <div className="resource-meta">
                  Rating: {rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultPage;