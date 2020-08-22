import React from "react";
import * as THREE from "three";

function Plane({ position }) {
  // This element serves as the cieling for the animation skybox
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[101, 101]} />
      <meshStandardMaterial
        attach="material"
        color="#eeeeee"
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default Plane;
