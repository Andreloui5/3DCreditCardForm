import React from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import Controls from "./Controls";
import "./styles.scss";
// import CreditCard from "./CreditCard";
import Card from "./Card";
import Plane from "./Plane";

export default function Animation() {
  return (
    <Canvas
      camera={{ position: [0, 0, 40] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      {/* <fog attach="fog" args={["white", 100, 100]} /> */}
      <Controls />
      <ambientLight intensity={0.2} />
      <spotLight
        position={[10, 10, 40]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />

      <Card
        number={"4242 4242 1561 1234"}
        name={"Craig Gant"}
        expiry={"01/23"}
      />
      <Plane />
    </Canvas>
  );
}
