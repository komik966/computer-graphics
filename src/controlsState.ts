/* tslint:disable:object-literal-sort-keys */
export interface ControlsState {
  camera: {
    fov: number;
    aspect: number;
    near: number;
    far: number;
    x: number;
    y: number;
    z: number;
  };
}

export const controlsInitialValue: ControlsState = {
  camera: {
    fov: 45,
    aspect: 1,
    near: 0.1,
    far: 2000,
    x: 0,
    y: 300,
    z: 1200
  }
};
