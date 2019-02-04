# React & D3 for data visualization
+ Using react with d3 to create components for data visualization

# Quick Start

## 1. Process Data
```js
// Format data as an array of objects
const data = [
    { experience: 3, pay: 1000, hrs: 65 },
    { experience: 7, pay: 3000, hrs: 100 }
];
```
## 2. Import React & XAxis
```js
import React         from "react";
import { Component } from "react";
import XAxis         from "react-d3-ggplot";

// Create new component to hold individual pieces
class GGPlot extends Component {
    state = {
        data:
        [
            { experience: 3, pay: 1000, hrs: 65 },
            { experience: 7, pay: 3000, hrs: 100 }
        ],
        dimensions:
        {
            width: window.innerWidth*0.9,
            height: window.innerHeight*0.9,
            padding: 50
        },
        className: "svg-chart__vis"
    }

    render(){
        const { data, dimensions, className } = this.state;

        return(
            <svg
                width={ dimensions.width }
                height={ dimensions.height }
                className={ className }
            >
                <XAxis
                    data={ data }
                    dimensions={ dimensions }
                    aes="experience"
                    scaleType="linear"
                    className={ className + " x-axis"}
                />
            </svg>
        );
    }
}
```
# API
## XAxis
| Prop            | Type   | Shape                                                                                |
|-----------------|--------|--------------------------------------------------------------------------------------|
| data            | Array  | Must pass in an array of objects                                                     |
| aes (aesthetic) | String | Must pass in a string to select the property you want as your x-value                |
| scaleType       | String | Must pass in a string with one of the following options: linear, time, ordinal       |
| dimensions      | Object | Must pass in an object with all following properties defined: width, height, padding |
| className       | String | Optional. Can pass in a string with a CSS className.                                   |

```js
import XAxis from "react-d3-ggplot";

// 1. data
// 2. aes - (choose your x-value by property name)
// 3. scaleType
// 4. dimensions
// 5. className
const state = {
        // data must be an array of objects
        data:
        [
            { experience: 3, pay: 1000, hrs: 65 },
            { experience: 7, pay: 3000, hrs: 100 }
        ],
        // dimensions object must contain all three options: width, height, and padding
        dimensions:
        {
            width: window.innerWidth*0.9,
            height: window.innerHeight*0.9,
            padding: 50
        },
        // className is optional
        className: "pay-chart"
}

const GGPLOT = () => (
    <svg width="500" height="500" className={ state.className }>
        <XAxis
            data={ state.data }
            dimensions={ state.dimensions }
            aes="experience"
            scaleType="linear"
            className={ className + " x-axis" }
        />
    </svg>
);
```

## YAxis
| Prop            | Type   | Shape                                                                                |
|-----------------|--------|--------------------------------------------------------------------------------------|
| data            | Array  | Must pass in an array of objects                                                     |
| aes (aesthetic) | String | Must pass in a string to select the property you want as your y-value                |
| scaleType       | String | Must pass in a string with one of the following options: linear, time, ordinal       |
| dimensions      | Object | Must pass in an object with all following properties defined: width, height, padding |
| className       | String | Optional. Can pass in a string with a CSS className.                                 |
```js
import YAxis from "react-d3-ggplot";

// 1. data
// 2. aes - (choose your y-value by property name)
// 3. scaleType
// 4. dimensions
// 5. className
const state = {
        // data must be an array of objects
        data:
        [
            { experience: 3, pay: 1000, hrs: 65 },
            { experience: 7, pay: 3000, hrs: 100 }
        ],
        // dimensions object must contain all three options: width, height, and padding
        dimensions:
        {
            width: window.innerWidth*0.9,
            height: window.innerHeight*0.9,
            padding: 50
        },
        // className is optional
        className: "pay-chart"
}

const GGPLOT = () => (
    <svg width="500" height="500" className={ state.className }>
        <YAxis
            data={ state.data }
            dimensions={ state.dimensions }
            aes="pay"
            scaleType="linear"
            className={ className + " y-axis" }
        />
    </svg>
);
```