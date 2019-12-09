import {
  AmbientLight,
  HemisphereLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import cybertruck from './models/cybertruck/cybertruck.fbx';
import buildings from './models/buildings.fbx';
import style from './style';
import { asyncScheduler, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

export class App {
  private renderer = new WebGLRenderer({ antialias: true });
  private scene = new Scene();
  private hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 1);
  private ambientLight = new AmbientLight();
  private camera = new PerspectiveCamera();

  public main() {
    this.addCanvasDomElement();
    this.loadModels();
    this.addLight();
  }

  private addCanvasDomElement() {
    const webGlCanvasId = 'webglCanvas';
    const webglCanvas = document.getElementById(webGlCanvasId);

    if (!webglCanvas) {
      throw new Error(`Html element with id ${webGlCanvasId} not found.`);
    }

    style(webglCanvas, { height: '100%', width: '100%' });
    webglCanvas.appendChild(this.renderer.domElement);

    const that = this;
    this.updateDimensions();
    fromEvent(window, 'resize')
      .pipe(throttleTime(100, asyncScheduler, { trailing: true }))
      .subscribe(() => that.updateDimensions.apply(that));

    webglCanvas.addEventListener('click', () =>
      webglCanvas.requestPointerLock(),
    );

    fromEvent<WheelEvent>(document, 'wheel')
      .pipe(throttleTime(100, asyncScheduler, { trailing: true }))
      .subscribe(e => {
        that.camera.position.setZ(that.camera.position.z + e.deltaY * 50);
        that.render.apply(that);
      });
  }

  private updateDimensions() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.render();
  }

  private loadModels() {
    const fbxLoader = new FBXLoader();
    fbxLoader.load(cybertruck, object => {
      this.scene.add(object);
      this.render();
    });
    fbxLoader.load(buildings, object => {
      this.scene.add(object);
      this.render();
    });
  }

  private addLight() {
    this.scene.add(this.ambientLight);
    this.scene.add(this.hemisphereLight);
    this.render();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
  }
}
