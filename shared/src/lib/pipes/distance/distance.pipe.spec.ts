import { DistancePipe } from './distance.pipe';

describe('distance pipe', (): void => {
  it('should append m unit', (): void => {
    const distancePipe: DistancePipe = new DistancePipe();
    const distance: number = 178.9;

    const formattedDistance: string = distancePipe.transform(distance);

    expect(formattedDistance).toStrictEqual('178.9 m');
  });

  it('should convert to km and append km unit when distance is greater than 1000', (): void => {
    const distancePipe: DistancePipe = new DistancePipe();
    const distance: number = 1784.9;

    const formattedDistance: string = distancePipe.transform(distance);

    expect(formattedDistance).toStrictEqual('1.8 km');
  });
});
