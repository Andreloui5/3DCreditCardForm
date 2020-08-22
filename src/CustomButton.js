import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Row, Col, Button } from "react-bootstrap";

function CustomButton(props) {
  const [hovered, setHovered] = useState(false);
  // sets animation for the button when hovered
  const hovering = useSpring({
    transform: hovered
      ? "translate3d(0px,0,0) scale(1.05) rotateX(0deg)"
      : "translate3d(0px,0,0) scale(1) rotateX(0deg)",
  });

  return (
    <Row>
      <Col>
        <animated.div
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          style={hovering}
          // centers and adds margin to bottom of element
          className="text-center mb-3"
        >
          <Button
            id="submit"
            variant="dark"
            onClick={props.handleSubmit}
            className="infoCard"
          >
            {props.text}
          </Button>
        </animated.div>
      </Col>
    </Row>
  );
}

export default CustomButton;
