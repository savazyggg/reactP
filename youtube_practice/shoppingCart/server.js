//sk_test_51NBiW3H7ywDwc14ph9xuR9CJgE3Osd4tX404Jr95IzQKl0r3Hgmdeyg5vt7i7iDDap9506sJpCQO8dxpjeq97uDI00BNkHx5nK
// coffee: price_1NBie2H7ywDwc14pmH6dxQTr
// sunglasses : price_1NBietH7ywDwc14p0Z5gwbd2
//camera:price_1NBifcH7ywDwc14pR5Jj1lZM

const express = require("express");
var cors = require("cors");
const stripe = require("strip")(
  "sk_test_51NBiW3H7ywDwc14ph9xuR9CJgE3Osd4tX404Jr95IzQKl0r3Hgmdeyg5vt7i7iDDap9506sJpCQO8dxpjeq97uDI00BNkHx5nK"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]

    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("Listening on port 4000!"));
