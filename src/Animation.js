import React from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import Controls from "./Controls";
import "./styles.scss";
// import CreditCard from "./CreditCard";
import Card from "./Card";
import Plane from "./Plane";
import Amex from "./assets/Cards/AMEX.png";
// import Visa from "./assets/Cards/VISA.png";
import BackDrop from "./BackDrop";
import Lighting from "./Lighting";

export default function Animation(props) {
  return (
    <div className={"cardAnimation"}>
      <Canvas
        camera={{ position: [0, 0, 30] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <Controls />
        <fog attach="fog" args={["#efefef", 200, 200]} />
        {/* <ambientLight intensity={0.2} />
      <spotLight
        position={[10, 10, 40]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      /> */}
        <Lighting />
        <Card
          cardType={Amex}
          number={props.cardNum}
          name={props.cardName}
          expiry={props.expDate}
        />
        {/* <Plane />
      <BackDrop /> */}
      </Canvas>
    </div>
  );
}
