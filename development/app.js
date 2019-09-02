import React from 'react';
import { GEOMS } from '../src/';
import { XAxis } from '../src/';
import { YAxis } from '../src/';
import { Line } from '../src/';
//import { Rects } from '../src/';
//import { Points } from '../src/';

const App = () => {
  //const data = [{ x: 0, y: 0 }, { x: 10, y: 10 }];
  const data = [
    { x: 'a', y: 7 },
    { x: 'b', y: 2 },
    { x: 'c', y: -5 },
    { x: 'd', y: 10 },
    { x: 'e', y: 3 },
    { x: 'f', y: -10 }
  ];
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
