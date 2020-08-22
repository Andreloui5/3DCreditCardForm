import React from "react";
import { Row, Col, Card } from "react-bootstrap";

function CartCard(props) {
  // Sets up a 'current cart' for the user (so they know what they're buying

  let cart;
  // if there is a cart, set variable 'cart' to reflect line items in it
  props.currentCart ? (cart = props.currentCart.line_items) : (cart = []);

  return (
    <Card id="cart">
      <Card.Title
        style={{ color: "white", fontSize: "20px" }}
        className="text-center"
      >
        Your Order
      </Card.Title>
      <Card.Body>
        {/* Iterates through items in cart and makes a row for each, displaying the item name and price */}
        {cart.map((item) => (
          <Row key={item.name}>
            <Col>
              <p style={{ float: "left" }} className="m-2">
                {item.name}
              </p>
              <p style={{ float: "right" }} className="m-2">
                {item.price.formatted}
              </p>
            </Col>
          </Row>
        ))}
        <hr></hr>
        {/* This displays the total price of all items in a user's cart */}
        <h4 className="text-center m-2">
          Total:{" "}
          {props.currentCart
            ? props.currentCart.live.total.formatted_with_symbol
            : "$0"}
        </h4>
      </Card.Body>
    </Card>
  );
}

export default CartCard;
