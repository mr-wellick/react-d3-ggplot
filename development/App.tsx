import * as React from "react";
import { useState } from "react";
import { GGPLOT } from "../src/GGPLOT";
import { GEOMS } from "../src/GEOMS";
import { Background } from "../src/Background";
import { XGrid } from "../src/XGrid/";
import { YGrid } from "../src/YGrid/";
import { XAxis } from "../src/XAxis";
import { YAxis } from "../src/YAxis";
import { Points } from "../src/Points";
import { Rects } from "../src/Rects";
// import { FACETS } from "../src/FACETS";
// import { Line } from "../src/Line";
// import { nest } from "d3-collection";
// import { mpg } from "./Data/";

const data = [
  { x: "a", y: 7 },
  { x: "b", y: 2 },
  { x: "c", y: -5 },
  { x: "d", y: 10 },
  { x: "e", y: 3 },
  { x: "f", y: -10 }
];

function App() {
  const [state, setState] = useState({
    data,
    aes: ["x", "y"],
    dimensions: {
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.9,
      padding: 50
    }
  });

  return (
    <>
      <GGPLOT {...state}>
        <Rects />
      </GGPLOT>
      <GEOMS {...state}>
        <XAxis />
        <YAxis />
        <Points />
      </GEOMS>
    </>
  );
}

export default App;
