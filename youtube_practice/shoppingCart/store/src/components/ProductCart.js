import React from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext } from "react";

const ProductCart = (props) => {
  //props.product is the product we are selling
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);

  console.log(cart.items);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        {productQuantity > 0 ? (
          <>
            <Form as={Row}>
              <Form.Label column="true" sm="6">
                In Cart: {productQuantity}
              </Form.Label>
              <Col sm="6">
                <Button
                  onClick={() => cart.addOneTocart(product.id)}
                  sm="6"
                  className="mx-2"
                >
                  +
                </Button>
                <Button
                  sm="6"
                  onClick={() => cart.removeOneFromCart(product.id)}
                  className="mx-2"
                >
                  -
                </Button>
                <Button
                  variant="danger"
                  className="my-2"
                  onClick={() => cart.deleteFromCart(product.id)}
                >
                  Remove from cart
                </Button>
              </Col>
            </Form>
          </>
        ) : (
          <Button
            variant="primary"
            onClick={() => cart.addOneTocart(product.id)}
          >
            add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCart;
