import LinearScale from '../linear-scale.js';

test('getInterval method returns an array with two values: [MIN, MAX]', () => {
  const data = [-1, 48, 10, 84, 75];
  const scale = new LinearScale(data);
  const [min, max] = scale.getInterval();

  expect(min).toBe(-1);
  expect(max).toBe(84);
});

test('getScale method returns a scale object', () => {
  const data = [-1, 48, 10, 84, 75];
  const scale = new LinearScale(data).getScale();

  expect(scale).toBeTruthy();
});
