import React from 'react';

export const ChartContext = React.createContext({
  data: [],
  aes: [],
  categories: [],
  dimensions: {}
});
