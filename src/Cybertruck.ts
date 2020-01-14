import { ImageLoader, Mesh, MeshPhongMaterial, Object3D } from 'three';
import textMain from './models/cybertruck/texMain.png';

export default class Cybertruck {
  public readonly object: Object3D;
  private body: Mesh;

  constructor(object: Object3D) {
    const imageLoader = new ImageLoader();
    const body = object.children.find(v => v.name === 'body') as Mesh;

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
    });

    this.object = object;
    this.body = body;
  }
}
