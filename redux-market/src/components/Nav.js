import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Nav.css";

export default function Nav() {
  const history = useHistory();
  const cart = useSelector((store) => store.cartReducer);

  console.log(cart);

  return (
    <nav className="nav">
      <span className="nav-title" onClick={() => history.push("/")}>
        Silver-market
      </span>
      <i onClick={() => history.push("/cart")} className="fas fa-shopping-cart">
        <div className="cart-amount">{cart.length}</div>
      </i>
    </nav>
  );
}
