import React from 'react';
import { GEOMS } from '../src/';
import { XAxis } from '../src/';
import { YAxis } from '../src/';
import { Line } from '../src/';

const App = () => {
  const data = [{ x: 0, y: 0 }, { x: 10, y: 10 }];
  const aes = ['x', 'y'];
  const dimensions = { width: 500, height: 300, padding: 50 };

  return (
    <GEOMS data={data} aes={aes} dimensions={dimensions}>
      <XAxis />
      <YAxis />
      <Line />
    </GEOMS>
  );
};

export default App;
