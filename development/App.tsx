import React from "react";
import { useState } from "react";
import { GEOMS } from "../src/GEOMS";
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

  return <GEOMS {...state} />;
}

export default App;
