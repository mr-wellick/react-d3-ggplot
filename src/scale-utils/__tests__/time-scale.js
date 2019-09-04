import TimeScale from '../time-scale.js';

test('getInterval should return min and max dates', () => {
  const data = [new Date('2010'), new Date('2015'), new Date('2020')];
  const interval = new TimeScale(data).getInterval();

  expect(interval.length).toBe(2);
});

test('getScale returns an object', () => {
  const data = [new Date('2010'), new Date('2015'), new Date('2020')];
  const scale = new TimeScale(data).getScale();

  expect(scale).toBeTruthy();
});
