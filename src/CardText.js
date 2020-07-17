import React from "react";
import { Text } from "drei";

function CardText(props) {
  return (
    <Text
      position={props.position}
      color={"black"}
      fontSize={2}
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      anchorX="left"
      anchorY="middle"
    >
      {props.text}
    </Text>
  );
}

export default CardText;
