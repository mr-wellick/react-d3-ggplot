import React from 'react';
import { GEOMS } from '../src/';
import { XAxis } from '../src/';
import { Stacks } from '../src/';
import { YAxisStack } from '../src/';

const data = [
  {
    category: 'automotive sales',
    quarter: 'Q1.2018',
    revenue: 2561881000,
    costOfRevenue: 2091397000
  },
  {
    category: 'automotive leasing',
    quarter: 'Q1.2018',
    revenue: 173436000,
    costOfRevenue: 104496000
  },
  {
    category: 'energy gen & storage',
    quarter: 'Q1.2018',
    revenue: 410022000,
    costOfRevenue: 375363000
  },
  {
    category: 'services & others',
    quarter: 'Q1.2018',
    revenue: 263412000,
    costOfRevenue: 380969000
  }
];

const App = () => {
  const aes = ['category'];
  const categories = ['revenue', 'costOfRevenue'];
  const dimensions = { width: 800, height: 300, padding: 50 };

  return (
    <GEOMS data={data} aes={aes} dimensions={dimensions} categories={categories}>
      <XAxis />
      <YAxisStack />
      <Stacks />
    </GEOMS>
  );
};

export default App;
