import React from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import Controls from "./Controls";
import "./styles.scss";
import Card from "./Card";
import Skybox from "./Skybox";

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
        <ambientLight intensity={0.35} />
        <spotLight
          intensity={1}
          position={[10, 60, 40]}
          penumbra={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          castShadow
        />
        {/* <CardModel /> */}
        <Card
          cardType={props.cardType}
          number={props.cardNum}
          name={props.cardName}
          expiry={props.expDate}
          cvv={props.cvv}
        />
        <Skybox />
      </Canvas>
    </div>
  );
}
