import "./styles/Products.css";
import { Sky } from "@react-three/drei";
import BaseBox from "./BaseBox";
import BaseCharacter from "./BaseCharacter";
import ThreeModel from "./ThreeModel";
import BasicScene from "./BaseScene";

const Map3D = () => {
  return (
    <div className="container">
      <div className="contact-div login-div">
        <h1 className="title">3D Map</h1>

        <BasicScene>
          <BaseBox
            text={false}
            position={[0, 0.5, 0]}
            args={[2, 1, 2]}
            color="red"
          />
          <BaseBox
            text={false}
            position={[5, 1, 0]}
            args={[1.5, 2, 1.3]}
            color="orange"
          />
          <BaseBox
            text={false}
            position={[0, 0.5, 5]}
            args={[3, 1, 1.3]}
            color="green"
          />

          <BaseCharacter
            controls
            position={[0, 2, 0]}
            args={[0.5]}
            color="yellow"
          />

          <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[10, 0, -5]} />
          <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[0, 0, 10]} />
          <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[-10, 0, 5]} />
          <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[-5, 0, -5]} />
          <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[0, 0, -10]} />
          <ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[10, 0, 5]} />
          <Sky />
        </BasicScene>
      </div>
    </div>
  );
};

export default Map3D;
