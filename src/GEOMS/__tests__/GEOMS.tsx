import React from "react";
import GEOMS from "../GEOMS";
import { IContext } from "../../_context";
import { render } from "react-testing-library";
import { cleanup } from "react-testing-library";
import { XAxis } from "../../XAxis";

afterEach(cleanup);

const notValidState = {
  data: [{ x: "0", y: "0" }, { x: "10", y: "10" }],
  aes: ["x", "y"]
};

// data is expected to have the following shape.
const validState: IContext = {
  data: [{ x: "0", y: "0" }, { x: "10", y: "10" }], // objects in array can have arbitrary property names & multiple properties
  aes: ["x", "y"], // these correspond to the property names above that we want to visualize
  dimensions: { width: 500, height: 300, padding: 50 }
};

test("<GEOMS /> throws an error when an invalid state object is passed in", () => {
  const node = () => {
    render(<GEOMS {...notValidState} />); // ts-lint complains here. however we need to test the invalid state shape
  };

  expect(node).toThrow();
});

test("<GEOMS/> throws an error when no props.children are passed in", () => {
  const node = () => {
    render(<GEOMS {...validState} />);
  };

  expect(node).toThrow();
});

test("<GEOMS/> uses ChartContext.Provider internally", () => {
  const { getByText } = render(
    <GEOMS {...validState}>
      <div>
        this node is used as a place holder so we don't fail. The components passed to GEOMS use the
        context value provided by GEOMS.
      </div>
    </GEOMS>
  );
});
