import React from "react";

function Plane() {
  return (
    <mesh position={[0, -20, 0]} rotation={[5, 0, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}

export default Plane;
