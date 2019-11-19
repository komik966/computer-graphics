import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import React, { FC, useEffect, useRef, useState } from 'react';
import { WebGLRenderer } from 'three';
import { initialState } from './Controls';
import Controls from './Controls/Controls';
import Render from './Render';

const App: FC = () => {
  const webglCanvas = useRef<HTMLDivElement>(null);
  const renderer = useRef(new WebGLRenderer({ antialias: true }));
  const [controlsState, setControlsState] = useState(initialState);

  useEffect(() => {
    if (webglCanvas.current) {
      webglCanvas.current.appendChild(renderer.current.domElement);
    }
  }, [webglCanvas]);

  useEffect(() => {
    const handleResize = () =>
      renderer.current.setSize(
        window.innerWidth - controlsWidth,
        window.innerHeight
      );
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [renderer]);

  return (
    <MuiThemeProvider theme={theme}>
      <div style={{ display: 'flex' }}>
        {webglCanvas && (
          <Render renderer={renderer.current} controlsState={controlsState} />
        )}
        <div ref={webglCanvas} />
        <div style={{ width: controlsWidth }}>
          <Controls setState={setControlsState} state={controlsState} />
        </div>
      </div>
    </MuiThemeProvider>
  );
};

const controlsWidth = 250;
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
