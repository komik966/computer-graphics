import { FC, useEffect } from 'react';
import { AmbientLight, DirectionalLight } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Objects } from './App';

const Render: FC<Props> = ({ objects }) => {
  useEffect(() => {
    const hlight = new AmbientLight(0x404040, 1);
    objects.scene.add(hlight);
    const directionalLight = new DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0, 1200, 0);
    directionalLight.castShadow = true;
    objects.scene.add(directionalLight);
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
      objects.scene.add(gltf.scene);
      objects.renderer.render(objects.scene, objects.camera);
    });
    const fbxLoader = new FBXLoader();
    fbxLoader.load('buildings/buildings.fbx', object => {
      objects.scene.add(object);
      objects.renderer.render(objects.scene, objects.camera);
    });
  }, [objects]);

  return null;
};

interface Props {
  objects: Objects;
}

export default Render;
