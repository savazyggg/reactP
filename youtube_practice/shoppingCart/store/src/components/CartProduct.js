import React from "react";
import Button from "react-bootstrap/Button";
import { CartContext } from "../CartContext";
import { useContext } from "react";
import { getProductData } from "../productStore";

const CartProduct = (props) => {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const ProductData = getProductData(id);
  return (
    <>
      <h3>{ProductData.title}</h3>
      <p>{quantity} total</p>
      <p>${(quantity * ProductData.price).toFixed(2)}</p>
      <Button size="sm" onClick={() => cart.deleteFromCart(id)}>
        Remove
      </Button>
      <hr></hr>
    </>
  );
};

export default CartProduct;
