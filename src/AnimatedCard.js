import React, { useState } from "react";
import { Row, Form, Card, Col } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import FormElement from "./FormElement";

function AnimatedCard(props) {
  // Animation Value
  const [hovered, setHovered] = useState(false);
  // sets opacity for checkout box when hovered
  const hoverOpacity = useSpring({
    opacity: hovered ? 0.98 : 0.72,
  });

  return (
    <animated.div
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setHovered(true)}
      style={hoverOpacity}
    >
      <Row>
        <Card as={Col} sm={12} className="class rounded">
          <h1 className="text-center mt-4">Payment Info</h1>
          <Form
            onSubmit={props.handleSubmit}
            className="p-4"
            style={{ opacity: 1 }}
          >
            {/* Cardholder Name */}
            <Form.Row>
              <FormElement
                controlId={"cardName"}
                formLabel={"Name on Card"}
                placeholder={"Bob Smith"}
                name={"cardName"}
                onChange={props.setName}
              />
            </Form.Row>
            {/* Card Number */}
            <Form.Row>
              <FormElement
                controlId={"cardNumber"}
                value={props.cardNum}
                formLabel={"Card Number"}
                placeholder={"•••• •••• •••• ••••"}
                name={"cardNumber"}
                onChange={props.handleFormChange}
              />
            </Form.Row>
            {/* Expiry */}
            <Form.Row>
              <FormElement
                controlId={"expirationDate"}
                smallColSize={6}
                value={props.expDate}
                formLabel={"Expiration Date"}
                placeholder={"01/23"}
                name={"expirationDate"}
                onChange={props.handleDateChange}
              />
              {/* CVV */}
              <FormElement
                controlId={"cvv"}
                smallColSize={6}
                value={props.cvv}
                formLabel={"Security Code"}
                placeholder={"123"}
                name={"cvv"}
                onChange={props.handleCvvChange}
              />
            </Form.Row>
          </Form>
        </Card>
      </Row>
    </animated.div>
  );
}

export default AnimatedCard;
