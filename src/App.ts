import {
  AmbientLight,
  HemisphereLight,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import cybertruckModel from './models/cybertruck/cybertruck.fbx';
import buildings from './models/buildings.fbx';
import style from './style';
import Cybertruck from './Cybertruck';

export class App {
  private renderer = new WebGLRenderer({ antialias: true });
  private scene = new Scene();
  private hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 1);
  private ambientLight = new AmbientLight();
  private camera = new PerspectiveCamera(45, 1, 10, 10_000);
  private orbitControls = new OrbitControls(
    this.camera,
    this.renderer.domElement,
  );
  private sky = new Sky();
  private cybertruck?: Cybertruck;

  public main() {
    this.orbitControls.target.set(0, 0.05, 0);
    this.orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
    this.animate();
    this.addCanvasDomElement();
    this.loadModels();
    this.addSky();
    this.addLight();
  }

  private addSky() {
    const theta = Math.PI * (0.49 - 0.5);
    const phi = 2 * Math.PI * (0.25 - 0.5);
    const distance = 400000;

    this.sky.scale.setScalar(450000);
    const material = this.sky.material as ShaderMaterial;
    material.uniforms.turbidity.value = 10;
    material.uniforms.rayleigh.value = 2;
    material.uniforms.mieCoefficient.value = 0.005;
    material.uniforms.mieDirectionalG.value = 0.8;
    material.uniforms.luminance.value = 1;
    material.uniforms.sunPosition.value = {
      x: distance * Math.cos(phi),
      y: distance * Math.sin(phi) * Math.sin(theta),
      z: distance * Math.sin(phi) * Math.cos(theta),
    };

    this.scene.add(this.sky);
  }

  private addCanvasDomElement() {
    const webGlCanvasId = 'webglCanvas';
    const webglCanvas = document.getElementById(webGlCanvasId);

    if (!webglCanvas) {
      throw new Error(`Html element with id ${webGlCanvasId} not found.`);
    }

    style(webglCanvas, { height: '100%', width: '100%' });
    webglCanvas.appendChild(this.renderer.domElement);
    this.updateDimensions();
    window.addEventListener('resize', () => {
      this.updateDimensions();
    });
  }

  private updateDimensions() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private loadModels() {
    const fbxLoader = new FBXLoader();

    fbxLoader.load(cybertruckModel, object => {
      this.cybertruck = new Cybertruck(object.children[0]);
      this.scene.add(this.cybertruck.object);
    });

    fbxLoader.load(buildings, object => {
      this.scene.add(object);
    });
  }

  private addLight() {
    this.scene.add(this.ambientLight);
    this.scene.add(this.hemisphereLight);
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}
