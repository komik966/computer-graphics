import { Object3D, Scene } from 'three';

export default class Cybertruck {
  public readonly object: Object3D;
  private readonly ACCELERATION = 10;
  private readonly NEUTRAL_DECELERATION = -30;
  private readonly BRAKE_DECELERATION = -50;
  private readonly DELTA_MS = 100;
  private accelerating = false;
  private accelerationTime = 0;
  private braking = false;
  private brakingTime = 0;
  private turningLeft = false;
  private turningRight = false;
  private speed = 0;

  constructor(model: Scene) {
    this.object =
      model.children[0].children[0].children[0].children[0].children[1];
    this.object.translateY(-300);
    this.object.scale.x = 30;
    this.object.scale.y = 30;
    this.object.scale.z = 30;
    this.bindKeys();

    setInterval(() => {
      if (this.accelerating) {
        this.accelerationTime += this.DELTA_MS;
      } else {
        this.accelerationTime = 0;
      }
      if (this.braking) {
        this.brakingTime += this.DELTA_MS;
      } else {
        this.brakingTime = 0;
      }
      this.speed +=
        this.ACCELERATION * this.accelerationTime +
        this.BRAKE_DECELERATION * this.brakingTime +
        this.DELTA_MS * this.NEUTRAL_DECELERATION;
      if (this.speed < 0 && !this.braking) {
        this.speed = 0;
      }
      this.object.position.z += (this.DELTA_MS * this.speed) / 100000;
      // this.object.position.z += (-1 * (this.DELTA_MS * this.speed)) / 100000;
    }, this.DELTA_MS);
  }

  private bindKeys() {
    const controller = (newValue: boolean) => (e: KeyboardEvent) => {
      switch (e.key) {
        case 'w':
          this.accelerating = newValue;
          break;
        case 'a':
          this.turningLeft = newValue;
          break;
        case 's':
          this.braking = newValue;
          break;
        case 'd':
          this.turningRight = newValue;
          break;
      }
    };
    document.addEventListener('keypress', controller(true));
    document.addEventListener('keyup', controller(false));
  }
}
