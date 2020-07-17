import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Text } from "drei";

function Card(props) {
  const creditCard = useRef();
  // useFrame(() => (creditCard.current.rotation.y += 0.01));

  return (
    <group ref={creditCard}>
      <mesh castShadow receiveShadow>
        <boxBufferGeometry attach="geometry" args={[30, 20, 0.5]} />
        <meshPhysicalMaterial attach="material" color={"pink"} />
      </mesh>
      <Text
        position={[-9, -1, 0.51]}
        castShadow
        maxWidth={30}
        maxHeight={20}
        color={"black"}
        fontSize={2}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="left"
        anchorY="middle"
      >
        {props.number}
      </Text>
      <Text
        position={[-13, -7, 0.51]}
        castShadow
        maxWidth={30}
        maxHeight={20}
        color={"black"}
        fontSize={2}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="left"
        anchorY="middle"
      >
        {props.name}
      </Text>
      <Text
        position={[5, -7, 0.51]}
        castShadow
        maxWidth={30}
        maxHeight={20}
        color={"black"}
        fontSize={2}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="left"
        anchorY="middle"
      >
        {props.expiry}
      </Text>
    </group>
  );
}

export default Card;
