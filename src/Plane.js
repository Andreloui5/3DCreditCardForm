import React from "react";

function Plane() {
  return (
    <mesh position={[0, -20, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[300, 300]} />
      <meshStandardMaterial attach="material" color="#548687" />
    </mesh>
  );
}

export default Plane;
