import React from "react";
import * as THREE from "three";

function Plane({ position }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[250, 250]} />
      <meshStandardMaterial
        attach="material"
        color="#2D3047"
        opacity={0.3}
        side={THREE.DoubleSide}
        // metalness={9}
      />
    </mesh>
  );
}

export default Plane;
