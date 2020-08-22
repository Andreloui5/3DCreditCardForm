import React from "react";
import { Text } from "drei";

function CardText(props) {
  // this element handles text elements that can then be rendered within our animation
  return (
    <Text
      rotation={props.rotation}
      position={props.position}
      color={"black"}
      fontSize={props.fontSize}
      font="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap"
      anchorX="left"
      anchorY="middle"
    >
      {props.text}
    </Text>
  );
}

export default CardText;
