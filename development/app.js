import React from 'react';
import { GEOMS } from '../src/';
import { XAxis } from '../src/';
import { YAxis } from '../src/';
import { Points } from '../src/';
import { mpg } from './Data/';

const App = () => {
  const dimensions = { width: 500, height: 300, padding: 50 };

  return (
    <GEOMS data={mpg} aes={['displ', 'hwy']} dimensions={dimensions}>
      <XAxis />
      <YAxis />
      <Points />
    </GEOMS>
  );
};

export default App;
