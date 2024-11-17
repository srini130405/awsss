import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Select a Task</h1>
      <Link to="/resource/1">
        <button>Task 1</button>
      </Link>
      <Link to="/resource/2">
        <button>Task 2</button>
      </Link>
    </div>
  );
}

export default HomePage;
