import * as React from "react";
import { GEOMS } from "../../GEOMS/";
import YAxis from "../YAxis";
import { render, cleanup } from "react-testing-library";

afterEach(cleanup);

// data is expected to have the following shape.
const validState = {
  data: [{ x: "0", y: "0" }, { x: "10", y: "10" }], // objects in array can have arbitrary property names & multiple properties
  aes: ["x", "y"], // these correspond to the property names above that we want to visualize
  dimensions: { width: 500, height: 300, padding: 50 }
};

test("Should render an <svg> element with only a YAxis", () => {
  const { container } = render(
    <GEOMS {...validState}>
      <YAxis y_path={true} />
    </GEOMS>
  );

  expect(container.firstChild).toMatchSnapshot();
});
