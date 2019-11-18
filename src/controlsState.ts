export interface ControlsState {
  camera: {
    fov: number;
  };
}

export const controlsInitialValue: ControlsState = {
  camera: {
    fov: 45
  }
};
