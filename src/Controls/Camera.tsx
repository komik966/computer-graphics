import { Divider, TextField, Typography } from '@material-ui/core';
import React, { FC, useState } from 'react';
import Arrows from './Arrows';
import { Objects } from '../types';

const Camera: FC<Props> = ({ objects }) => {
  const [state, setState] = useState({
    aspect: 1,
    far: 1200,
    fov: 45,
    near: 0.1,
    x: 0,
    y: 0,
    z: 0
  });
  return (
    <>
      <TextField
        type="number"
        label="fov"
        value={state.fov}
        onChange={e => {
          setState({ ...state, fov: +e.target.value });
          objects.camera.fov = +e.target.value;
          objects.camera.updateProjectionMatrix();
          objects.renderer.render(objects.scene, objects.camera);
        }}
      />
      <TextField
        type="number"
        label="aspect"
        value={state.aspect}
        onChange={e => {
          setState({ ...state, aspect: +e.target.value });
          objects.camera.aspect = +e.target.value;
          objects.camera.updateProjectionMatrix();
          objects.renderer.render(objects.scene, objects.camera);
        }}
      />
      <TextField
        type="number"
        label="near"
        inputProps={{ step: 50 }}
        value={state.near}
        onChange={e => {
          setState({ ...state, near: +e.target.value });
          objects.camera.near = +e.target.value;
          objects.camera.updateProjectionMatrix();
          objects.renderer.render(objects.scene, objects.camera);
        }}
      />
      <TextField
        type="number"
        inputProps={{ step: 50 }}
        label="far"
        value={state.far}
        onChange={e => {
          setState({ ...state, far: +e.target.value });
          objects.camera.far = +e.target.value;
          objects.camera.updateProjectionMatrix();
          objects.renderer.render(objects.scene, objects.camera);
        }}
      />
      <TextField
        type="number"
        inputProps={{ step: 10 }}
        label="x"
        value={state.x}
        onChange={e => {
          setState({ ...state, x: +e.target.value });
          objects.camera.position.setX(+e.target.value);
          objects.renderer.render(objects.scene, objects.camera);
        }}
      />
      <TextField
        type="number"
        inputProps={{ step: 10 }}
        label="y"
        value={state.y}
        onChange={e => {
          setState({ ...state, y: +e.target.value });
          objects.camera.position.setY(+e.target.value);
          objects.renderer.render(objects.scene, objects.camera);
        }}
      />
      <TextField
        type="number"
        inputProps={{ step: 10 }}
        label="z"
        value={state.z}
        onChange={e => {
          setState({ ...state, z: +e.target.value });
          objects.camera.position.setZ(+e.target.value);
          objects.renderer.render(objects.scene, objects.camera);
        }}
      />

      <Typography>Rotation</Typography>
      <Divider />
      <Arrows
        left={() => {
          objects.camera.rotateY(0.1);
          objects.renderer.render(objects.scene, objects.camera);
        }}
        up={() => {
          objects.camera.rotateX(0.1);
          objects.renderer.render(objects.scene, objects.camera);
        }}
        down={() => {
          objects.camera.rotateX(-0.1);
          objects.renderer.render(objects.scene, objects.camera);
        }}
        right={() => {
          objects.camera.rotateY(-0.1);
          objects.renderer.render(objects.scene, objects.camera);
        }}
        into={() => {
          objects.camera.rotateZ(0.1);
          objects.renderer.render(objects.scene, objects.camera);
        }}
        out={() => {
          objects.camera.rotateZ(-0.1);
          objects.renderer.render(objects.scene, objects.camera);
        }}
      />
    </>
  );
};

interface Props {
  objects: Objects;
}

export default Camera;
