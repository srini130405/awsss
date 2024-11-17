import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import Forum from './components/Forum';
import HomePage from './components/HomePage';
import ResourceReqPage from './components/ResourceReqPage';
import TestPage from './components/TestPage';
import ResultPage from './components/ResultPage';
import Home from './components/Home';
import Chlghome from './components/chlghome';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/challenges" element={<HomePage />} />
        <Route path="/resource/:taskId" element={<ResourceReqPage />} />
        <Route path="/test/:taskId" element={<TestPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/chlg" element={<Chlghome/>}/>
      </Routes>
    </Router>
  );
};

export default App;
