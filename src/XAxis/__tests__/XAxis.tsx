import React from "react";
import { GEOMS } from "../../GEOMS/";
import XAxis from "../XAxis";
import { render, cleanup } from "react-testing-library";

afterEach(cleanup);

// data is expected to have the following shape.
const validState = {
  data: [{ x: "0", y: "0" }, { x: "10", y: "10" }], // objects in array can have arbitrary property names & multiple properties
  aes: ["x", "y"], // these correspond to the property names above that we want to visualize
  dimensions: { width: 500, height: 300, padding: 50 }
};

test("Should render an <svg> with only an XAxis", () => {
  // we don't care about testing <GEOMS/> here. We have already tested it seperately. Go check GEOMS.
  // we only care about <XAxis/> which should give a <g> element containing a <path>, <line>, and <text>
  // all which collectively make up an x-axis
  const { container } = render(
    <GEOMS {...validState}>
      <XAxis />
    </GEOMS>
  );

  expect(container.firstChild).toMatchSnapshot();
});
