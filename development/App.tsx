import * as React from "react";
import { useState } from "react";
// import { GEOMS } from "../src/GEOMS";
// import { XGrid } from "../src/XGrid/";
// import { YGrid } from "../src/YGrid/";
// import { Background } from "../src/Background";
// import { XAxis } from "../src/XAxis";
// import { YAxis } from "../src/YAxis";
// import { FACETS } from "../src/FACETS";
// import { Points } from "../src/Points";
// import { Line } from "../src/Line";
// import { nest } from "d3-collection";
// import { mpg } from "./Data/";
import { GGPLOT } from "../src/GGPLOT";
import { Rects } from "../src/Rects";

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
    </>
  );
}

export default App;
