import { Group } from 'three';

export default class Buildings {
  public readonly object: Group;

  constructor(model: Group) {
    this.object = model;
  }
}
