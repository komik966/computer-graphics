import { App } from './App';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import buildings from './Buildings/model.fbx';
import cybertruck from './Cybertruck/model.fbx';
import { Group } from 'three';

const fbxLoader = new FBXLoader();
let buildingsModel: Group;
let cybertruckModel: Group;
fbxLoader.load(buildings, object => {
  buildingsModel = object;
});
fbxLoader.load(cybertruck, object => {
  cybertruckModel = object;
});

const readyCheckLoop = setInterval(() => {
  if (buildingsModel && cybertruckModel) {
    new App(cybertruckModel, buildingsModel);
    clearInterval(readyCheckLoop);
  }
}, 500);
