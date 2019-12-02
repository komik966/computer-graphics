import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  HemisphereLight
} from 'three';

export interface Objects {
  ambient: AmbientLight;
  camera: PerspectiveCamera;
  directional: DirectionalLight;
  hemisphere: HemisphereLight;
  renderer: WebGLRenderer;
  scene: Scene;
}
