import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ colors, stock, singleProduct }) => {
  const { hangleAddtoCart } = useCartContext();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const handleIncrease = () => {
    if (amount < stock) {
      setAmount((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors :</span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                className={
                  color === selectedColor ? "color-btn active" : "color-btn"
                }
                style={{ backgroundColor: color }}
                onClick={() => {
                  setSelectedColor(color);
                }}
              >
                {color === selectedColor && <FaCheck />}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        {stock ? (
          <>
            <AmountButtons
              amount={amount}
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
            />
            <Link
              to="/cart"
              className="btn"
              onClick={() =>
                hangleAddtoCart(singleProduct, amount, selectedColor)
              }
            >
              add to cart
            </Link>
          </>
        ) : (
          "out of order"
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
