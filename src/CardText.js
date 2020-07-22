import React from "react";
import { Text } from "drei";

function CardText(props) {
  return (
    <Text
      position={props.position}
      color={"black"}
      fontSize={2}
      font="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap"
      anchorX="left"
      anchorY="middle"
    >
      {props.text}
    </Text>
  );
}

export default CardText;
