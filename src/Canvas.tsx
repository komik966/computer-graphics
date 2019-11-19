import React, { FC, useEffect, useRef } from 'react';
import { asyncScheduler, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { WebGLRenderer } from 'three';
import { controlsWidth } from './App';

const Canvas: FC<Props> = ({ renderer }) => {
  const webglCanvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (webglCanvas.current) {
      webglCanvas.current.appendChild(renderer.domElement);
    }
  }, [renderer, webglCanvas]);

  useEffect(() => {
    renderer.setSize(window.innerWidth - controlsWidth, window.innerHeight);
    const subscription = fromEvent(window, 'resize')
      .pipe(throttleTime(200, asyncScheduler, { trailing: true }))
      .subscribe({
        next() {
          renderer.setSize(
            window.innerWidth - controlsWidth,
            window.innerHeight
          );
        }
      });

    return subscription.unsubscribe;
  }, [renderer]);

  return <div ref={webglCanvas} />;
};

interface Props {
  renderer: WebGLRenderer;
}

export default Canvas;
