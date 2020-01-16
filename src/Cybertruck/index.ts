import { Group, ImageLoader, Mesh, MeshPhongMaterial, Object3D } from 'three';
import textMain from './texMain.png';

export default class Cybertruck {
  public readonly object: Object3D;

  constructor(model: Group, imageLoader: ImageLoader) {
    this.object = model.children[0];

    const body = this.object.children.find(v => v.name === 'body') as Mesh;

    const materialArray = body.material as MeshPhongMaterial[];
    imageLoader.load(textMain, image => {
      materialArray[0].map!.image = image;
      materialArray[0].needsUpdate = true;
      materialArray[1].map!.image = image;
      materialArray[1].needsUpdate = true;
      materialArray[2].map!.image = image;
      materialArray[2].needsUpdate = true;
      materialArray[3].map!.image = image;
      materialArray[3].needsUpdate = true;
      materialArray[4].map!.image = image;
      materialArray[4].needsUpdate = true;

      console.log(body);

      this.object.translateY(-300);
      this.object.rotateZ(30);
      this.object.scale.x = 30;
      this.object.scale.y = 30;
      this.object.scale.z = 30;
    });
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
