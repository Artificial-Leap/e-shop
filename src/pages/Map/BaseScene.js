import { Canvas } from "@react-three/fiber";
import { Loader, PointerLockControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Lights from "./Lights";
import Floor from "./Floor";

const BasicScene = ({ children }) => {
  return (
    <div style={{ width: "80vw", height: "80vh" }}>
      <Canvas shadows camera={{ fov: 50 }}>
        <Lights />

        <Physics gravity={[0, -9.8, 0]}>
          {children}

          <Floor rotation={[Math.PI / -2, 0, 0]} color="white" />
        </Physics>

        <PointerLockControls />
      </Canvas>
      <Loader />
    </div>
  );
};

export default BasicScene;
