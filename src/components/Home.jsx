import React from 'react';
import { Link } from 'react-router-dom';
import './hm.css';

const Home = () => {
  return (
    <div class="bd">
    <div class="grid-bg" >
    <div class="navbar">
   <div class="logo">
    
    <span>
     Dev
    </span>
    Labs
   </div>
   <div class="nav-links">
    <a href="#">
     Challenges
    </a>
    <a class="active" href="#">
     Forum
    </a>
    <a href="#">
     Roadmap
    </a>
    <a href="#">
     Profile
    </a>
   </div>
  
  </div>
  <div class="main-content">
    <div class="fade1 relative">
      <div class="fade1-container">
       <div class="lmao"> 
   <div class="lol" >
    Welcome to&nbsp;
    <span>
     Devlabs&nbsp;
    </span>
    ,&nbsp;<br/>Happy learning.
   </div>
   </div>
   <div class="pp">
    Codebase consists of a series of landing and support pages which companies can use to promote new products and business launches.
   </div>
   </div>
   </div>
 
   <div class="buttons">
    <div class="but">
      <Link to="/forum">
    <a class="start-building" href="#">
     Forum
    </a></Link>
    <Link to="/chlg">
    <a class="start-building1" href="#">
     Challenges
    </a></Link>
    </div>
   </div>
  </div>
    </div>
    </div>
  );
};

export default Home;
