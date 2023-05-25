// coffee: price_1NBie2H7ywDwc14pmH6dxQTr
// sunglasses : price_1NBietH7ywDwc14p0Z5gwbd2
//camera:price_1NBifcH7ywDwc14pR5Jj1lZM

const productsArray = [
  { id: "price_1NBie2H7ywDwc14pmH6dxQTr", title: "Coffe", price: 4.99 },
  { id: "price_1NBietH7ywDwc14p0Z5gwbd2", title: "Sunglasses", price: 9.99 },
  { id: "price_1NBifcH7ywDwc14pR5Jj1lZM", title: "Camera", price: 39.99 },
];

function getProductData(id) {
  let ProductData = productsArray.find((product) => product.id === id);
  if (ProductData === undefined) {
    console.log("product data dose not exist for id: " + id);
    return undefined;
  }
  return ProductData;
}

export { productsArray, getProductData };
