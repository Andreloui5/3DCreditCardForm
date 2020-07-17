import React, { useRef, useMemo } from "react";
// import { useFrame } from "react-three-fiber";
import CardText from "./CardText";
import * as THREE from "three";

function Card(props) {
  const creditCard = useRef();
  // useFrame(() => (creditCard.current.rotation.y += 0.01));

  const texture = useMemo(
    () => new THREE.TextureLoader().load(props.cardType),
    [props.cardType]
  );

  return (
    <group ref={creditCard}>
      <mesh castShadow receiveShadow>
        <boxBufferGeometry attach="geometry" args={[30, 20, 0.5]} />

        <meshStandardMaterial
          map={texture}
          attach="material"
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      {/* Card Number */}
      <CardText position={[-13, -1, 0.5]} text={props.number} />
      {/* Customer Name */}
      <CardText position={[-13, -7, 0.5]} text={props.name} />
      {/* Expiration Date */}
      <CardText position={[5, -7, 0.5]} text={props.expiry} />
    </group>
  );
}

export default Card;
