import React from "react";
import * as THREE from "three";

function BackDrop({ position, rotation }) {
  return (
    <mesh receiveShadow position={position} rotation={rotation}>
      <planeBufferGeometry attach="geometry" args={[200, 200]} />
      <meshStandardMaterial
        side={THREE.DoubleSide}
        attach="material"
        color="#2D3047"
        opacity={0.35}
      />
    </mesh>
  );
}

export default BackDrop;
