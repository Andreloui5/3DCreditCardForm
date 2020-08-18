import React, { useRef, useMemo } from "react";
import CardText from "./CardText";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

function Card(props) {
  const creditCard = useRef();

  const texture = useMemo(
    () => new THREE.TextureLoader().load(props.cardType),
    [props.cardType]
  );

  useFrame(() => (creditCard.current.rotation.y += 0.003));

  return (
    <>
      <group ref={creditCard}>
        {/* Card Mesh */}
        <mesh castShadow>
          <boxBufferGeometry attach="geometry" args={[30, 20, 0.5]} />
          <meshStandardMaterial
            map={texture}
            attach="material"
            roughness={0.1}
            metalness={0}
          />
        </mesh>
        {/* Magnetic Strip */}
        <mesh receiveShadow position={[0, 2.5, -0.26]}>
          <planeBufferGeometry attach="geometry" args={[30, 3]} />
          <meshStandardMaterial
            attach="material"
            color="#0f0f0f"
            opacity={0.3}
            side={THREE.DoubleSide}
            metalness={6}
          />
        </mesh>
        {/* Card Number */}
        <CardText
          position={[-13, -1, 0.26]}
          text={props.number}
          fontSize={2.1}
        />
        {/* Customer Name */}
        <CardText position={[-13, -7, 0.26]} text={props.name} fontSize={1.9} />
        {/* Valid Thru */}
        <CardText position={[5, -5, 0.26]} text={"Valid Thru"} fontSize={1} />
        {/* Expiration Date */}
        <CardText position={[5, -7, 0.26]} text={props.expiry} fontSize={1.9} />
        {/* Cvv */}
        <CardText
          rotation={[0, Math.PI, 0]}
          position={[-6, 0, -0.26]}
          text={props.cvv}
          fontSize={1.9}
        />
      </group>
    </>
  );
}

export default Card;
