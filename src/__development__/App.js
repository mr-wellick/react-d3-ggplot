import React from "react";
import { useState } from "react";
//import { useEffect } from "react";
//import { Background } from "../Background/";
//import { GGPLOT } from "../GGPLOT/";
//import { Line } from "../Line/";
//import { Points } from "../Points/";
//import { Rects } from "../Rects/";
import { XAxis } from "../XAxis";
import { GEOMS } from "../GEOMS";
import mpg from "./Data/mpg.json";
import { geoStream } from "d3";
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
    <GEOMS {...state}>
      <XAxis />
    </GEOMS>
  );
}

export default App;
