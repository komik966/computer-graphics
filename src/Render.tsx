import { FC, useEffect, useRef } from 'react';
import {
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer
} from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { State } from './Controls/state';

const Render: FC<Props> = ({ renderer, controlsState }) => {
  const camera = useRef(new PerspectiveCamera());
  const scene = useRef(new Scene());

  useEffect(() => {
    camera.current = new PerspectiveCamera(
      controlsState.camera.fov,
      controlsState.camera.aspect,
      controlsState.camera.near,
      controlsState.camera.far
    );

    camera.current.position.set(
      controlsState.camera.x,
      controlsState.camera.y,
      controlsState.camera.z
    );

    renderer.render(scene.current, camera.current);
  }, [renderer, controlsState.camera]);

  useEffect(() => {
    const hlight = new AmbientLight(0x404040, 1);
    scene.current.add(hlight);
    const directionalLight = new DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0, 1200, 0);
    directionalLight.castShadow = true;
    scene.current.add(directionalLight);
    // const light = new PointLight(0xc4c4c4, 10);
    // light.position.set(0, 300, 500);
    // scene.current.add(light);
    // const light2 = new PointLight(0xc4c4c4, 10);
    // light2.position.set(500, 100, 0);
    // scene.current.add(light2);
    // const light3 = new PointLight(0xc4c4c4, 10);
    // light3.position.set(0, 100, -500);
    // scene.current.add(light3);
    // const light4 = new PointLight(0xc4c4c4, 10);
    // light4.position.set(-500, 300, 500);
    // scene.current.add(light4);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('mustang/scene.gltf', gltf => {
      scene.current.add(gltf.scene);
      renderer.render(scene.current, camera.current);
    });
    const fbxLoader = new FBXLoader();
    fbxLoader.load('buildings/buildings.fbx', object => {
      scene.current.add(object);
      renderer.render(scene.current, camera.current);
    });
  }, [renderer]);

  return null;
};

interface Props {
  renderer: WebGLRenderer;
  controlsState: State;
}

export default Render;
