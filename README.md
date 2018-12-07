# Note:
+ Figure out how to convert to "proper" npm package so intallations work.

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
```js
import XAxis from "react-d3-ggplot";

// 1. data 
// 2. dimensions
// 3. aes (short for aesthetic)
// 4. scaleType
// 5. className
const GGPLOT = () => (
    <svg width="500" height="500">
        <XAxis
            data={ data }
            dimensions={ dimensions }
            aes="experience"
            scaleType="linear"
            className={ className + " x-axis" }
        />
    </svg>
); 
```
