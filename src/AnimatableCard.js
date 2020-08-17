import React from "react";
import { Card, Col } from "react-bootstrap";

function AnimatableCard() {
  return <Card as={Col} sm={12} className="rounded"></Card>;
}

export default AnimatableCard;
