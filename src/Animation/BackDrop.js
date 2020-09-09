import React from "react";
import * as THREE from "three";

function BackDrop({ position, rotation, opacity }) {
  // this element is one wall (used to make up the sides of the skybox background)
  return (
    <mesh receiveShadow position={position} rotation={rotation}>
      <planeBufferGeometry attach="geometry" args={[101, 101]} />
      <meshStandardMaterial
        side={THREE.DoubleSide}
        attach="material"
        color="#eeeeee"
        opacity={opacity}
      />
    </mesh>
  );
}

export default BackDrop;
