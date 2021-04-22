import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart } from "../store/action";
import "./CartItem.css";

export default function CartItem({ item, idx }) {
  const cartItems = useSelector((store) => store.cartReducer);
  const dispatch = useDispatch();

  const filterItem = () => {
    const cart = cartItems.filter((_, i) => {
      return i !== idx;
    });

    dispatch(deleteCart(cart));
  };

  return (
    <div className="cart-item">
      <img className="cart-item-image" alt="cart-item" src={item.product_img} />
      <span className="cart-item-name">{item.product_name}</span>
      <span className="cart-item-price">{item.price.toLocaleString()}원</span>
      <i onClick={filterItem} className="fas fa-trash-alt"></i>
    </div>
  );
}
