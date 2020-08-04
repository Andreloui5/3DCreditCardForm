import React from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import Controls from "./Controls";
import "./styles.scss";
// import CreditCard from "./CreditCard";
import Card from "./Card";
// import Plane from "./Plane";
// import BackDrop from "./BackDrop";

export default function Animation(props) {
  return (
    <div>
      <Canvas
        className={"cardAnimation"}
        camera={{ position: [0, 0, 20] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <Controls />
        <fog attach="fog" args={["#548687;", 150, 150]} />
        <ambientLight intensity={0.8} />
        {/* <spotLight
          position={[10, 10, 40]}
          penumbra={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          castShadow
        /> */}

        <Card
          cardType={props.cardType}
          number={props.cardNum}
          name={props.cardName}
          expiry={props.expDate}
        />
        {/* <Plane /> */}
        {/* <BackDrop /> */}
      </Canvas>
    </div>
  );
}
