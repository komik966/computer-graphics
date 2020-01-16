import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Navigation {
  public readonly camera = new PerspectiveCamera(45, 1, 10, 10_000);
  private readonly orbitControls: OrbitControls;

  constructor(rendererDomElement: HTMLCanvasElement) {
    this.orbitControls = new OrbitControls(this.camera, rendererDomElement);
    this.camera.position.x = 0;
    this.camera.position.y = 100;
    this.camera.position.z = 700;
    this.camera.lookAt(0, 0, 0);
    this.orbitControls.target.set(0, 0.05, 0);
    this.orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
  }
}
