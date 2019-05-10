import React from "react";
import { useState } from "react";
import { GEOMS } from "../src/GEOMS";
import { XAxis } from "../src/XAxis";
import { YAxis } from "../src/YAxis";
import { Background } from "../src/Background";
import mpg from "./Data/mpg.json";
//import { nest } from "d3-collection";

//function formatData() {
//  const subset = nest()
//    .key(d => d["year"])
//    .entries(mpg);
//  const rawData = subset.map(item => item["values"]);
//
//  return rawData;
//}

function App() {
  const [state] = useState({
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
      <GEOMS {...state}>
        {/*
         */}
        <Background />
        <YAxis />
        <XAxis />
      </GEOMS>
    </>
  );
}

export default App;
