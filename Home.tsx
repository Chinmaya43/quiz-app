import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to the Quiz App</h1>
      <button onClick={() => navigate('/quiz')}>Start Quiz</button>
    </div>
  );
};

export default Home;