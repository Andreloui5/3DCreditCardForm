import React, { useState } from "react";
import { Row, Form, Card, Col } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import FormElement from "./FormElement";
import Animation from "./Animation";

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
        <Card as={Col} sm={12} className="rounded">
          <h1 className="text-center mt-4">{props.title}</h1>
          <Form
            onSubmit={props.handleSubmit}
            className="p-4"
            style={{ opacity: 1 }}
          >
            <Animation
              cardNum={props.cardNum}
              cardName={props.cardName}
              expDate={props.expDate}
              cvv={props.cvv}
              cardType={props.cardType}
            />

            <Form.Row>
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

export default AnimatedCard;
