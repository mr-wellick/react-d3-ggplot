# react-d3-ggplot
+ Using React.js and D3.js to build simple and reusable components for data visualizations on the web.

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
```

## 2. The React props that each component in the `react-d3-ggplot` library accepts are the following:
| Prop            | Required | Description                                                                          |
|-----------------|----------|--------------------------------------------------------------------------------------|
| data            | true     | `data` must be an array of objects                                                     |
| aes             | true     | Aes is short for aesthetic. We use `aes` to select the property that we want to use as our x-value or y-value.|
| scaleType       | true     | We use `scaleType` to select the type of scale we want: linear (for numerical data), time (used when working with dates), and ordinal (for categorical data)|
| dimensions      | true     | The `dimensions` object must contain three properties: width, height, and padding.       |
| className       | false    | `className` is optional and is used to define a regular CSS class name |

## 3. Using components from react-d3-gglpot library
+ Here's the workflow when using components from `react-d3-ggplot`
```js
import React         from "react";
import { Component } from "react";

// The XAxis and YAxis will form the base of all your data visualizations
import XAxis from "react-d3-gglot";
import YAxis from "react-d3-gglot";  

// Then we import the type of plot we want: Rects (for barplots), Points (for scatterplots), and Line (for line charts)
import Rects from "react-d3-gglot";

class BarPlot extends Component{
    state = {
        data: [
            { experience: 3, pay: 1000, hrs: 65 },
            { experience: 7, pay: 3000, hrs: 100 }
        ],
        dimensions: { width: 600, height: 400, padding: 50 }
    }

    render(){
        const { dimensions, data } = this.state;

        return(
            // Wrap all react-d3-ggplot components in an svg
            <svg width={ dimensions.width } height={ dimensions.height }>
                <XAxis
                    data={ data }             // Pass in the data first
                    aes="experience"          // Select your x-value (chosen directly from your data)
                    scaleType="linear"        // Select the scaleType: linear for numerical data
                    dimensions={ dimensions } // Pass in the dimensions of your graph
                />
                <YAxis
                    data={ data }             // Pass in the data first
                    aes="pay"                 // Select your y-value (chosen directly from your data)
                    scaleType="linear"        // Select the scaleType: linear for numerical data
                    dimensions={ dimensions } // Pass in the dimensions of you graph
                />
                <Rects
                    data={ data }                       // Pass in the data first
                    aes={ ["experience", "pay"] }       // Pass in an array cotaining two string values. The first entry must be your x-value and the second entry must be your your y-value
                    scaleTypes={ ["linear", "linear"] } // Pass in an array containing two string values. The first entry must be the scaleType of your XAxis and the second value must be the scaleType of your YAxis
                    dimensions={ dimensions }           // Pass in the dimensions if your graph
                />
            </svg>
        );
    }
}
```

## 4. As we can see, the workflow is always the same for each component from the react-d3-ggplot library
+ Pass in the data
+ Select the aesthetic (the x-value or y-value)
+ Select the scaleType
+ Pass in the dimensions

```js
// NOTE: The API differs slightly for <Rects/>, <Points/>, and <Line/>

// The reason aes and scaleTypes take an array instead of a single string value is because:
// 1. We need to tell <Rects/> what our x and y values will be
// 2. We need to tell <Rects/> what the scaleTypes will be for our x and y values
     <Rects
        data={ data }
        aes={ ["experience", "pay"] }
        scaleTypes={ ["linear", "linear"] }
        dimensions={ dimensions }
    />
```

# API
## XAxis
| Prop            | Type   | Shape                                                                                |
|-----------------|--------|--------------------------------------------------------------------------------------|
| data            | Array  | Must pass in an array of objects                                                     |
| aes (aesthetic) | String | Must pass in a string to select the property you want as your x-value                |
| scaleType       | String | Must pass in a string with one of the following options: linear, time, ordinal       |
| dimensions      | Object | Must pass in an object with all following properties defined: width, height, padding |
| className       | String | Optional. Can pass in a string with a CSS className.                                 |

```js
import XAxis from "react-d3-ggplot";

// 1. data
// 2. aes - (choose your x-value by property name)
// 3. scaleType
// 4. dimensions
// 5. className
    <XAxis
        data={ data }
        aes="x-value"
        scaleType="scale-type"
        dimensions={ dimensions }
        className={ className }
    />
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
    <YAxis
        data={ data }
        aes="y-value"
        scaleType="scale-type"
        dimensions={ dimensions }
        className={ className }
    />
```

## Rects
| Prop            | Type   | Shape                                                                                |
|-----------------|--------|--------------------------------------------------------------------------------------|
| data            | Array  | Must pass in an array of objects                                                     |
| aes (aesthetic) | Array  | Must pass in an array cotaining two string values. The first entry must be your x-value and the second entry must be your your y-value|
| scaleType       | Array  | Pass in an array containing two string values. The first entry must be the scaleType of your XAxis and the second value must be the scaleType of your YAxis|
| dimensions      | Object | Must pass in an object with all following properties defined: width, height, padding |
| className       | String | Optional. Can pass in a string with a CSS className.                                 |

```js
import Rects from "react-d3-ggplot";

// 1. data
// 2. aes - (choose your x-value and y-value by property name)
// 3. scaleType - (choose the same scaleTypes used by your XAxis and YAxis components)
// 4. dimensions
// 5. className
    <Rects
        data={ data }
        aes={ ["x-value", "y-value"] }
        scaleTypes={ ["x-scale-type", "y-scale-type"] }
        dimensions={ dimensions }
    />
```