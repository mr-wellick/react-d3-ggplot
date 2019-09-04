import React from 'react';
import { render } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { GEOMS } from '../../geoms';
import Line from '../line.js';

afterEach(cleanup);

test('Underlying SVG markup should not change when we change our component logic', () => {
  // changing validState will change the markup
  const validState = {
    data: [{ x: 0, y: 0 }, { x: 10, y: 10 }],
    aes: ['x', 'y'],
    dimensions: { width: 500, height: 300, padding: 50 }
  };

  // should render an <svg/> containing a <path/> element
  const { container } = render(
    <GEOMS {...validState}>
      <Line />
    </GEOMS>
  );

  expect(container.firstChild).toMatchSnapshot();
});
