// Question.js
import React from 'react';

const Question = ({ problem }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Problem Statement</h2>
      <p>{problem}</p>
    </div>
  );
};

export default Question;