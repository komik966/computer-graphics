import { Object3D, Scene } from 'three';

export default class Cybertruck {
  public readonly object: Object3D;

  constructor(model: Scene) {
    this.object =
      model.children[0].children[0].children[0].children[0].children[1];
    this.object.translateY(-300);
    this.object.rotateZ(30);
    this.object.scale.x = 30;
    this.object.scale.y = 30;
    this.object.scale.z = 30;
  }

  public startAccelerate() {}
  public stopAccelerate() {}
  public startBrake() {}
  public stopBrake() {}
  public startTurnLeft() {}
  public stopTurnLeft() {}
  public startTurnRight() {}
  public stopTurnRight() {}
}
