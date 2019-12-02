import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import React, { FC, useEffect, useRef } from 'react';
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  HemisphereLight
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { asyncScheduler, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import Controls from './Controls/Controls';
import { Objects } from './types';

const App: FC = () => {
  const objects = useRef<Objects>({
    ambient: new AmbientLight(),
    camera: new PerspectiveCamera(),
    directional: new DirectionalLight(),
    hemisphere: new HemisphereLight(0xffffbb, 0x080820, 1),
    renderer: new WebGLRenderer({ antialias: true }),
    scene: new Scene()
  }).current;

  useEffect(() => {
    objects.scene.add(objects.ambient);
    objects.scene.add(objects.directional);
    objects.scene.add(objects.hemisphere);
  }, []);

  useEffect(() => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('cybertruck/scene.gltf', gltf => {
      objects.scene.add(gltf.scene);
      objects.renderer.render(objects.scene, objects.camera);
    });
    const fbxLoader = new FBXLoader();
    fbxLoader.load('buildings/buildings.fbx', object => {
      objects.scene.add(object);
      objects.renderer.render(objects.scene, objects.camera);
    });
  }, [objects]);

  const webglCanvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (webglCanvas.current) {
      webglCanvas.current.appendChild(objects.renderer.domElement);
    }
  }, [objects.renderer, webglCanvas]);

  useEffect(() => {
    objects.renderer.setSize(
      window.innerWidth - controlsWidth,
      window.innerHeight
    );
    const subscription = fromEvent(window, 'resize')
      .pipe(throttleTime(200, asyncScheduler, { trailing: true }))
      .subscribe({
        next() {
          objects.renderer.setSize(
            window.innerWidth - controlsWidth,
            window.innerHeight
          );
        }
      });

    return subscription.unsubscribe;
  }, [objects.renderer]);

  return (
    <MuiThemeProvider theme={theme}>
      <div style={{ display: 'flex' }}>
        <div ref={webglCanvas} />
        <div style={{ width: controlsWidth }}>
          <Controls objects={objects} />
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export const controlsWidth = 250;
const theme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        minWidth: '0 !important'
      }
    }
  },
  props: {
    MuiTextField: {
      margin: 'dense',
      variant: 'outlined'
    }
  }
});

export default App;
