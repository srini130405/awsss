import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const styles = {
    container: {
      width: '300px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      textAlign: 'center',
    },
    button: {
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Select a Task</h1>
      <Link to="/forum">
        <button style={styles.button}>Forum</button>
      </Link>
      <Link to="/challenges">
        <button style={styles.button}>Challenges</button>
      </Link>
    </div>
  );
};

export default Home;
