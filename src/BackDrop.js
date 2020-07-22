import React from "react";

function BackDrop() {
  return (
    <mesh receiveShadow position={[0, -1, -25]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}

export default BackDrop;
