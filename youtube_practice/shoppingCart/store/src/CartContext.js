import { createContext, useState } from "react";
import { productsArray, getProductData } from "./productStore";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneTocart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  //[{id: 1, quantity: 2}, {id: 2, quantity: 1}]

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;
    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  function addOneTocart(id) {
    const quantity = getProductQuantity(id);
    if (quantity === 0) {
      //product is not in cart
      setCartProducts([...cartProducts, { id: id, quantity: 1 }]);
    } else {
      //product is in cart
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  // map -> id 2를 예를 들면
  // id 1은 내가 찾는 것이 아니야 그래서 map된 product그 자체 {id: 1, quantity: 2}를 배열에 반환,
  // id 2는 내가 찾는거야 그래서 map된  product에서 spread 해서 quantity가 아닌 키/value 다 복사, quantity만 빼서 value+1로 수정

  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id !== id;
      })
    );
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);
    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const ProductData = getProductData(cartItem.id);
      totalCost += ProductData.price * cartItem.quantity;
    });
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneTocart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
//context (cart, addtocart,removecart)
//provider -> gives me react app access to all the things in my context

//funtion이 context에 있는건 여기서 함수를 실행해서 provider에는 값만 넘겨주기 위해
