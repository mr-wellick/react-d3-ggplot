import React from 'react';
import { render } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { GEOMS } from '../../geoms';
import Rects from '../rects.js';

afterEach(cleanup);

test('Underlying SVG markup should not change when we change our component logic', () => {
  // changing validState will change the markup
  const validState = {
    data: [{ x: 'a', y: 15 }, { x: 'b', y: 10 }, { x: 'c', y: 20 }],
    aes: ['x', 'y'],
    dimensions: { width: 500, height: 300, padding: 50 }
  };

  // should only render an <svg/> containing <rect/> elements
  const { container } = render(
    <GEOMS {...validState}>
      <Rects />
    </GEOMS>
  );

  expect(container.firstChild).toMatchSnapshot();
});
