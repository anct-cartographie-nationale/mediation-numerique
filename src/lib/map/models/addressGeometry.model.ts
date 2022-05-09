export class AddressGeometry {
  public coordinates: Array<number>;
  public type: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }

  public getLat(): number {
    return this.coordinates[1];
  }

  public getLon(): number {
    return this.coordinates[0];
  }
}
