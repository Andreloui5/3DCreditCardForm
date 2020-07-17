import React, { useRef } from "react";
// import { useFrame } from "react-three-fiber";
import CardText from "./CardText";

function Card(props) {
  const creditCard = useRef();
  // useFrame(() => (creditCard.current.rotation.y += 0.01));

  return (
    <group ref={creditCard}>
      <mesh castShadow receiveShadow>
        <boxBufferGeometry attach="geometry" args={[30, 20, 0.5]} />
        <meshPhysicalMaterial attach="material" color={"pink"} />
      </mesh>
      {/* Card Number */}
      <CardText position={[-9, -1, 0.5]} text={props.number} />
      {/* Customer Name */}
      <CardText position={[-13, -7, 0.5]} text={props.name} />
      {/* Expiration Date */}
      <CardText position={[5, -7, 0.5]} text={props.expiry} />
    </group>
  );
}

export default Card;
