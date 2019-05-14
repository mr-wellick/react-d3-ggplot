import React from "react";
import GGPLOT from "../GGPLOT";
import { render } from "react-testing-library";

const validState = {
  data: [{ x: 1, y: 1 }, { x: 100, y: 100 }],
  aes: ["x", "y"],
  dimensions: { width: 300, height: 500, padding: 10 }
};

const invalidState = {
  // data: [{ x: 1, y: 1 }, {x: 100, y: 100}],
  aes: ["x", "y"],
  dimensions: { width: 300, height: 500, padding: 10 }
};

test("test for an invalid state being passed in", () => {
  console.log("placeholder test");
});
