import React, { useState } from "react";
import { Row, Form, Card, Col } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import FormElement from "./FormElement";
import Animation from "./Animation";

function AnimatedCardWithCreditCard(props) {
  // Animation Value
  const [hovered, setHovered] = useState(false);
  // sets animation for checkout box when hovered
  const hovering = useSpring({
    transform: hovered
      ? "translate3d(0px,0,0) scale(1.05) rotateX(0deg)"
      : "translate3d(0px,0,0) scale(1) rotateX(0deg)",
  });

  return (
    <animated.div
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      style={hovering}
    >
      <Row>
        <Card as={Col} sm={12} className="rounded infoCard">
          <h1 className="text-center mt-4">{props.title}</h1>
          <Form onSubmit={props.handleSubmit} className="p-4 ">
            <p className="text-center" style={{ color: "#eae6e5" }}>
              Watch the animation respond as you enter card numbers beginning
              with 4, 5, 6, 35, and 37.
              <span>
                <br></br>
              </span>
              Use 4242 4242 4242 4242 to test payment.
            </p>
            <Animation
              cardNum={props.cardNum}
              cardName={props.cardName}
              expDate={props.expDate}
              cvv={props.cvv}
              cardType={props.cardType}
            />

            <Form.Row className="mt-3">
              {props.formDetails.map((field) => (
                <FormElement
                  key={field.controlId}
                  controlId={field.controlId}
                  smallColSize={field.smallColSize}
                  formLabel={field.formLabel}
                  placeholder={field.placeholder}
                  name={field.name}
                  handleChange={props.handleChange}
                  value={field.value}
                />
              ))}
            </Form.Row>
          </Form>
        </Card>
      </Row>
    </animated.div>
  );
}

export default AnimatedCardWithCreditCard;
