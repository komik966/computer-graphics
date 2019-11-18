import React, { FC, useEffect, useRef, useState } from 'react';
import { WebGLRenderer } from 'three';
import Controls from './Controls';
import { controlsInitialValue } from './controlsState';
import Render from './Render';

const App: FC = () => {
  const webglCanvas = useRef<HTMLDivElement>(null);
  const renderer = useRef(new WebGLRenderer());
  const [controlsState, setControlsState] = useState(controlsInitialValue);

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
    <div style={{ display: 'flex' }}>
      {webglCanvas && (
        <Render renderer={renderer.current} controlsState={controlsState} />
      )}
      <div ref={webglCanvas} />
      <div style={{ width: controlsWidth }}>
        <Controls setState={setControlsState} state={controlsState} />
      </div>
    </div>
  );
};

const controlsWidth = 250;

export default App;
