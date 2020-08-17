import React from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import Controls from "./Controls";
import "./styles.scss";
// import CreditCard from "./CreditCard";
import Card from "./Card";
import Plane from "./Plane";
import BackDrop from "./BackDrop";

export default function Animation(props) {
  return (
    <div>
      <Canvas
        className={"cardAnimation"}
        camera={{ position: [0, 0, 25] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <Controls />
        {/* <fog attach="fog" args={["#548687;", 150, 150]} /> */}
        <ambientLight intensity={0.8} />
        <spotLight
          intensity={0.2}
          position={[10, 60, 40]}
          penumbra={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          castShadow
        />

        <Card
          cardType={props.cardType}
          number={props.cardNum}
          name={props.cardName}
          expiry={props.expDate}
        />
        <Plane position={[0, -30, 0]} />
        <Plane position={[0, 30, 0]} />
        <BackDrop rotation={[0, 0, 0]} position={[0, -1, -50]} />
        <BackDrop rotation={[0, Math.PI / 2, 0]} position={[-50, -1, -50]} />
        <BackDrop rotation={[0, Math.PI / 2, 0]} position={[50, -1, -50]} />
        <BackDrop rotation={[0, 0, 0]} position={[0, -1, 50]} />
      </Canvas>
    </div>
  );
}
