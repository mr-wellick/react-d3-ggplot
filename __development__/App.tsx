import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GEOMS } from "../src/GEOMS";
import { GGPLOT } from "../src/GGPLOT";
import { Background } from "../src/Background";
import { XAxis } from "../src/XAxis";
import { YAxis } from "../src/YAxis";
import { Points } from "../src/Points";
import { Rects } from "../src/Rects";
import { Line } from "../src/Line";
// import mpg from "./Data/mpg.json";
// import { nest } from "d3-collection";

// function formatData() {
//   const subset = nest()
//     .key(d => d["year"])
//     .entries(mpg);
//   const rawData = subset.map(item => item["values"]);
//
//   return rawData;
// }

function App() {
  const [state, setState] = useState({
    data: [],
    aes: ["date", "close"],
    dimensions: {
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.9,
      padding: 50
    }
  });

  useEffect(() => {
    fetch("https://api.iextrading.com/1.0/stock/aapl/chart/5y")
      .then(res => res.json())
      .then(data => {
        // format date to JS date objects
        const formattedData = data.map((item: { [key: string]: any }) => ({
          ...item,
          date: new Date(item.date)
        }));
        // update state with correctly formatted data
        setState({ ...state, data: formattedData });
      });
  }, []);

  if (state.data.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <GGPLOT {...state}>
        <Line />
      </GGPLOT>
    </>
  );
}

export default App;
