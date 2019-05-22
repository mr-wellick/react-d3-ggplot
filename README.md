![NPM](https://img.shields.io/npm/l/react-d3-ggplot.svg?color=%230f82bc&style=popout-square)
![Travis (.org)](https://img.shields.io/travis/ll2nz/react-d3-ggplot.svg?style=popout-square)
![npm](https://img.shields.io/npm/v/react-d3-ggplot.svg?style=popout-square)
![Codecov](https://img.shields.io/codecov/c/github/ll2nz/react-d3-ggplot.svg?style=popout-square)

# react-d3-ggplot

- Using React.js, TypeScript, and D3.js to build simple and reusable components for data visualizations on the web.

```zsh
# yarn
yarn add react-d3-ggplot

# npm
npm install react-d3-ggplot
```

# Quick Start

| Props            | Description                       |
| ---------------- | --------------------------------- |
| data             | An array of objects               |
| aes (aesthetics) | An array with two strings         |
| dimensions       | An object: width, height, padding |

```js
import React from "react";
import { useState } from "react";
import { GGPLOT } from "react-d3-ggplot";
import { Line } from "react-d3-ggplot";

const LineChart = () => {
  const [state, setState] = useState({
    data: [{ x: 0, y: 0 }, { x: 10, y: 10 }],
    aes: ["x", "y"],
    dimensions: { width: 500, height: 300, padding: 50 }
  });

  return (
    <GGPLOT {...state}>
      <Line />
    </GGPLOT>
  );
};
```

# Documentation

- Official Documentation [in progress]
- Contributing as an experienced developer [in progress]
- Contributing as a beginner [in progress]
- Goal of the project [in progress]

# Live Example

- https://codesandbox.io/s/p9wrv4moz7
