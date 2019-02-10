# react-d3-ggplot
+ Using React.js and D3.js to build simple and reusable components for data visualizations on the web.
```zsh
# yarn
yarn add react-d3-ggplot

# npm
npm install react-d3-ggplot
```

# Demo (gif)
![graph-demo](demos/ggplot-demo.gif)

# Introduction
+ Before we look at some examples, we first need to talk about our data. The structure of our data is important to get right the first time because this will make it easier to work with.

## 1. We must first format our data as an array of objects
+ Each object in the array can have as many properties as you want, as long as the object "lengths" match and the property names match.
```js
// here's an example of a valid format
const data = [
    { experience: 3, pay: 1000, hrs: 65 }, // The "length" of each object is 3.
    { experience: 7, pay: 3000, hrs: 100 } // And each object has the same properties: experience, pay, and hrs.
];

// remarks on using dates
const someOtherData = [
    { experience: 3, pay: 1000, hrs: 65, date: new Date("01-01-2010") }, // When using dates, they must be formatted as
    { experience: 7, pay: 3000, hrs: 100, date: new Date("01-07-2018") } // valid JavaScript date objects, as in this example.
];
```

## 2. The main component in `react-d3-ggplot` is `<GGPLOT/>`
+ `<GGPLOT/>` will only render the `x-axis` and `y-axis`.
+ It is up to you to choose one of the following `geoms` (geometric object):
    + Points
    + Line
    + Rects

+ `<GGPLOT/>` has four main props that are required

| Prop            | Required | Description                                                                               |
|-----------------|----------|-------------------------------------------------------------------------------------------|
| data            | true     | `data` must be an array of objects                                                        |
| aes (aesthetic) | true     | `aes` must be an array containing two strings: "x-value" and "y-value"                    |
| scaleTypes      | true     | `scaleTypes` must be an array containing two strings: "x-scale-type" and "y-scale-type"   |
| dimensions      | true     | `dimensions` must be an object with three properties: width, height, and padding. |

## 3. Using react-d3-ggplot library
```js
import React         from "react";
import { Component } from "react";

// We need to bring in <GGPLOT/>
import { GGPLOT } from "react-d3-ggplot";

// Then we import the type of plot we want: Rects (for barplots), Points (for scatterplots), and Line (for line charts)
import { Points } from "react-d3-ggplot";

// We can also add labels
import { Labels } from "react-d3-ggplot";

class ScatterPlot extends Component{
    state = {
        data: [
            { experience: 3, pay: 1000, hrs: 65, date: new Date("01-01-2010") },
            { experience: 7, pay: 3000, hrs: 100, date: new Date("01-01-2020") }
        ],
        aes: ["experience", "pay"],       // Choose x-values and y-values directly from data. (Must pass in x first and y second)
        scaleTypes: ["linear", "linear"], // Choose the scale-type for x and y. Since both our x-values and y-values are numbers, we choose linear for both. (Must pass in scale-type for x first and scale-type for y second.)

        dimensions: { width: 600, height: 400, padding: 50 } // Finally, choose the dimensions of your graph.
    }

    render(){
        return(
            <GGPLOT { ...this.state } >
                <Labels x_lab="experience" y_lab="pay"/>
                <Points/>
            </GGPLOT>
        );
    }
}
```

## 4. As we can see, the workflow is always the same when using `<GGPLOT/>` to create graphs
+ Define the our data
+ Select the aes (the x-value and y-value)
+ Select the scaleTypes
+ Set the dimensions of the graph
