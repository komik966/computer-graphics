import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import React, { FC, useRef } from 'react';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import Canvas from './Canvas';
import Controls from './Controls/Controls';
import Render from './Render';

const App: FC = () => {
  const objects = useRef<Objects>({
    camera: new PerspectiveCamera(),
    renderer: new WebGLRenderer({ antialias: true }),
    scene: new Scene()
  }).current;

  return (
    <MuiThemeProvider theme={theme}>
      <div style={{ display: 'flex' }}>
        <Render objects={objects} />
        <Canvas renderer={objects.renderer} />
        <div style={{ width: controlsWidth }}>
          <Controls objects={objects} />
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export interface Objects {
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  scene: Scene;
}

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
