import React, { useRef, useMemo, useEffect, useState } from "react";
// import { useFrame } from "react-three-fiber";
import CardText from "./CardText";
import * as THREE from "three";

function Card(props) {
  const creditCard = useRef();
  // useFrame(() => (creditCard.current.rotation.y += 0.01));

  // ADD USESTATE FOR CARDTYPE???
  // ADD USEEFFECT HOOK WITH LISTENER ON PROPS.CARDNUM

  const texture = useMemo(
    () => new THREE.TextureLoader().load(props.cardType),
    [props.cardType]
  );

  return (
    <group ref={creditCard}>
      <mesh castShadow>
        <boxBufferGeometry attach="geometry" args={[30, 20, 0.5]} />
        <meshStandardMaterial
          map={texture}
          attach="material"
          roughness={0.1}
          metalness={0}
        />
      </mesh>
      {/* Card Number */}
      <CardText position={[-13, -1, 0.5]} text={props.number} fontSize={2.1} />
      {/* Customer Name */}
      <CardText position={[-13, -7, 0.5]} text={props.name} fontSize={1.9} />
      {/* Expiration Date */}
      <CardText position={[5, -7, 0.5]} text={props.expiry} fontSize={1.9} />
    </group>
  );
}

export default Card;
