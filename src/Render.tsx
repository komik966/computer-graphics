import { FC, useEffect } from 'react';
import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ControlsState } from './controlsState';

const Render: FC<Props> = ({ renderer }) => {
  useEffect(() => {
    const scene = createScene();
    const camera = createCamera();
    scene.add(camera);
    loadModels(gltf => scene.add(gltf.scene));

    renderer.render(scene, camera);
  }, [renderer]);
  return null;
};

const createRenderer = () => {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);

  return renderer;
};

const createScene = () => {
  const scene = new Scene();

  return scene;
};

const createCamera = () => {
  const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.lookAt(new Vector3(0, 0, 0));

  return camera;
};

const loadModels = (onLoad: (gltf: GLTF) => void) => {
  const loader = new GLTFLoader();
  loader.load('mustang/scene.gltf', onLoad);
};

interface Props {
  renderer: WebGLRenderer;
  controlsState: ControlsState;
}

export default Render;
