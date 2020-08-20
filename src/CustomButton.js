import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Button } from "react-bootstrap";

function CustomButton(props) {
  const [hovered, setHovered] = useState(false);
  // sets animation for checkout box when hovered
  const hovering = useSpring({
    transform: hovered
      ? "translate3d(-7px,0,0) scale(1.05) rotateX(0deg)"
      : "translate3d(0px,0,0) scale(1) rotateX(0deg)",
  });

  return (
    <animated.div
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      style={hovering}
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
  );
}

export default CustomButton;
