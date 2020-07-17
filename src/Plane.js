import React from "react";

function Plane() {
  return (
    <mesh position={[0, 0, -20]} castShadow receiveShadow>
      <planeBufferGeometry attach="geometry" args={[2000, 2000]} />
      <meshPhysicalMaterial attach="material" color="#ffffff" />
    </mesh>
  );
}

export default Plane;
