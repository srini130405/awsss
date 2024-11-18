import { Link } from 'react-router-dom';
import React from 'react';
import './hompg.css';


function HomePage() {
  return (
    <div class="bdd">
  <div class="whole">
  <div class="container">
   <div class="content">
    <h1>
     Learn HTML &amp; CSS
    </h1>
    <div class="details">
     1 hours of content • 3 lessons
    </div>
    <div class="progress-bar">
     <div class="progress-text">
      Progress: 0/2
     </div>
     <div class="progress">
      <div class="progress-fill">
      </div>
     </div>&nbsp;
     <div class="progress-percentage">
      0%
     </div>
    </div>
    <div class="section">
     <h2>
      Project
     </h2>
     <div class="project">
      <img class="img1" alt="A person working on a circuit board with a laptop and tools on the table" width="680px" height="750px" src="https://storage.googleapis.com/a1aa/image/M4wxrU5exOxvISMBdcQnnKhxh2BdTVmYR0Ic2xY28xkIH94JA.jpg" />
      <div class="description">
       <h3>
        Build a personal portfolio page
       </h3>
       <p>
        Use your new HTML and CSS skills to create a simple personal portfolio page. This project will give you a chance to practice the basics of HTML and CSS.
       </p>
       <button class="start-button">
       Start ...
      </button>
      </div>
    
     </div>
    </div>
    <div class="section">
     <h2>
      Exercises
     </h2>
     <div class="exercise">
      <img alt="A person typing on a laptop with code on the screen" height="150" src="https://storage.googleapis.com/a1aa/image/Q254AfJNkzVbZahrhTP6kMWU66qfE7BKV2tz2FfP2Ssmc0jnA.jpg" width="200"/>
      <div class="description">
       <h3>
        Create a list of your favorite things
       </h3>
       <p>
        Practice creating lists in HTML by making a list of your favorite things. You can use any tag you like, but try to use the right tag for the job!
       </p>
      </div>
      <Link to="/resource/1">
      <button class="start-button">
       Start exercise
      </button></Link>
     </div>
     <div class="exercise">
      <img alt="A laptop on a desk with a lamp and a cup of coffee" height="150" src="https://storage.googleapis.com/a1aa/image/frgPlkez6JtZDE342e3e23je0eaYGy7fQEIY6gKBzP3AIH94JA.jpg" width="200"/>
      <div class="description">
       <h3>
        Style your favorite things list
       </h3>
       <p>
        Now that you've created a list of your favorite things, use CSS to style it! You can change the font, size, color, and more. This is your chance to get creative!
       </p>
      </div>
      <Link to="/resource/2">
      <button class="start-button">
       Start exercise
      </button>
      </Link>
     </div>
    </div>
   </div>
  </div>
  </div>
  </div>
  );
}

export default HomePage;
