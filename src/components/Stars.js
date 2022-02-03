import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const Stars = ({ stars, reviews }) => {
  const getStarsArray = (stars) => {
    const Array = [];
    for (let i = 0; i < 5; i++) {
      let tag =
        stars <= 0 ? <BsStar /> : stars >= 1 ? <BsStarFill /> : <BsStarHalf />;
      Array.push(<span key={i}>{tag}</span>);
      stars -= 1;
    }
    return Array;
  };

  const starArray = getStarsArray(stars);
  return (
    <Wrapper>
      <div className="stars">{starArray}</div>
      <p className="reviews">({reviews} customer reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
