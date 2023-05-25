import React from "react";
import { Row, Col } from "react-bootstrap";
import { productsArray } from "../productStore";
import ProductCart from "../components/ProductCart";

const Store = () => {
  return (
    <>
      <h1 align="center" className="p-3">
        welcome store
      </h1>
      <Row xs={1} md={3} className="g-4">
        {productsArray.map((product, idx) => {
          return (
            <Col key={idx} align="center">
              <ProductCart product={product} />
              {/* 첫번째 product는 props, 두번째는 map에서 펼쳐진 product */}
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Store;
