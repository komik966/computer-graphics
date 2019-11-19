import { TextField } from '@material-ui/core';
import React, { FC } from 'react';
import { State } from './state';

const Camera: FC<Props> = ({ state, setState }) => (
  <>
    <TextField
      type="number"
      label="fov"
      value={state.camera.fov}
      onChange={e =>
        setState({
          ...state,
          ...{ camera: { ...state.camera, fov: +e.target.value } }
        })
      }
    />
    <TextField
      type="number"
      label="aspect"
      value={state.camera.aspect}
      onChange={e =>
        setState({
          ...state,
          ...{ camera: { ...state.camera, aspect: +e.target.value } }
        })
      }
    />
    <TextField
      type="number"
      label="near"
      value={state.camera.near}
      onChange={e =>
        setState({
          ...state,
          ...{ camera: { ...state.camera, near: +e.target.value } }
        })
      }
    />
    <TextField
      type="number"
      label="far"
      value={state.camera.far}
      onChange={e =>
        setState({
          ...state,
          ...{ camera: { ...state.camera, far: +e.target.value } }
        })
      }
    />
    <TextField
      type="number"
      label="x"
      value={state.camera.x}
      onChange={e =>
        setState({
          ...state,
          ...{ camera: { ...state.camera, x: +e.target.value } }
        })
      }
    />
    <TextField
      type="number"
      label="y"
      value={state.camera.y}
      onChange={e =>
        setState({
          ...state,
          ...{ camera: { ...state.camera, y: +e.target.value } }
        })
      }
    />
    <TextField
      type="number"
      label="z"
      value={state.camera.z}
      onChange={e =>
        setState({
          ...state,
          ...{ camera: { ...state.camera, z: +e.target.value } }
        })
      }
    />
  </>
);

interface Props {
  state: State;
  setState: (s: State) => void;
}

export default Camera;
