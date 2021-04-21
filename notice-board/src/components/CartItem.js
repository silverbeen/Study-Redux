import React from "react";
import "./CartItem.css";

export default function CartItem () {
    return (
        <div className="cart-item">
            <img 
            className="cart-item-image"
            alt="cart-item" 
            src="https://image.brandi.me/cproduct/2020/11/12/23464617_1605150605_image1_M.jpg"
            />
            <span className="cart-item-name">임의의 상품</span>
            <span className="cart-item-price">10,000원</span>
            <i className="fas fa-trash-alt"></i>
        </div>
    );
}