import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Card = ({ svg, svgWidth = '50px', svgHeight = '50px', text }) => {
  return (
    <StyledWrapper>
             <Link to="/challenges">
             
      <div className="card">
        <div className="card-svg" style={{ width: svgWidth, height: svgHeight }}>
          {svg}
        </div>
        <div className="text">{text}</div>
      </div>
      </Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
button{
padding:0px;
},
.card { 
  position: relative;
  width: 190px;  /* Square shape with smaller dimension */
  height: 190px; /* Square shape with smaller dimension */
  background-color: #000;
  display: flex;
  justify-content: center; /* Center logo horizontally */
  align-items: center; /* Center logo vertically */
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  color: white;
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  width: 190px;  /* Match the card's width */
  height: 190px; /* Match the card's height */
  border-radius: 10px;
  background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%);
  z-index: -10;
  pointer-events: none;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card::after {
  content: "";
  z-index: -1;
  position: absolute;
  inset: 0;
  background: linear-gradient(-45deg, #b300cc 0%, #009e99 100%);
  transform: translate3d(0, 0, 0) scale(0.95);
  filter: blur(20px);
}

.card-svg {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  font-size: 14px;
  text-align: center;
  color: white;
}

.card:hover::after {
  filter: blur(30px);
}

.card:hover::before {
  transform: rotate(-90deg) scale(1); /* Uniform scaling to maintain square shape */
}

`;

export default Card;
