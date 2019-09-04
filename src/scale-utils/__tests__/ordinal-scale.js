import OrdinalScale from '../ordinal-scale.js';

test('getScale should return unique entries only', () => {
  const data = ['pay', 'pay', 'experience', 'years'];
  const scale = new OrdinalScale(data).getScale();
  const domain = scale.domain();

  expect(domain.length).toBe(3);
});
