import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cartState } = useCartContext();

  return (
    <main>
      <PageHero title="Checkout" />
      <Wrapper className="page">
        {cartState.cartItem.length === 0 ? (
          <div className="empty">
            <h2>your cart is empty</h2>
            <Link className="btn" to="/products">
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
