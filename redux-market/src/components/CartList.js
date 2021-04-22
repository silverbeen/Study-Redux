import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import "./CartList.css";

export default function CartList() {
  const cart = useSelector((store) => store.cartReducer);

  const cartItem =
    cart.length >= 1 ? (
      cart.map((item, idx) => {
        return <CartItem key={idx} item={item} idx={idx} />;
      })
    ) : (
      <div className="cart-empty">장바구니가 비어 있습니다</div>
    );

  return (
    <section className="cart-list">
      <h2 className="cart-list-title">장바구니</h2>
      {cartItem}
    </section>
  );
}
