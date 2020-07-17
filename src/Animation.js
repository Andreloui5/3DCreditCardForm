import React from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import Controls from "./Controls";
import "./styles.scss";
// import CreditCard from "./CreditCard";
import Card from "./Card";
import Plane from "./Plane";
// import Amex from "./assets/Cards/AMEX.png";
import Visa from "./assets/Cards/VISA.png";

export default function Animation() {
  return (
    <Canvas
      camera={{ position: [0, 0, 40] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <Controls />
      {/* <fog attach="fog" args={["white", 100, 100]} /> */}
      <ambientLight intensity={0.2} />
      <spotLight
        position={[10, 10, 40]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />

      <Card
        cardType={Visa}
        number={"4242 4242 1561 1234"}
        name={"Craig Gant"}
        expiry={"01/23"}
      />
      <Plane />
    </Canvas>
  );
}
