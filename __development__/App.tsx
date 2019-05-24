import * as React from "react";
import { useState } from "react";
// import { GEOMS } from "../src/GEOMS";
// import { XGrid } from "../src/XGrid/";
// import { YGrid } from "../src/YGrid/";
// import { Background } from "../src/Background";
// import { XAxis } from "../src/XAxis";
// import { YAxis } from "../src/YAxis";
import { GGPLOT } from "../src/GGPLOT";
import { Points } from "../src/Points";
// import { Rects } from "../src/Rects";
// import { Line } from "../src/Line";
// import { nest } from "d3-collection";
import { mpg } from "./Data/";

function App() {
  const [state, setState] = useState({
    data: mpg,
    aes: ["displ", "hwy"],
    dimensions: {
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.9,
      padding: 50
    }
  });

  return (
    <>
      <GGPLOT {...state}>
        <Points />
      </GGPLOT>
    </>
  );
}

export default App;
