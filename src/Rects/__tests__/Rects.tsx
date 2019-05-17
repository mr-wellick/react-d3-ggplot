// ALE complains when we just use import React from "react";
import * as React from "react";
import Rects from "../Rects";
import { GEOMS } from "../../GEOMS/";
import { render, cleanup } from "react-testing-library";

afterEach(cleanup);

// this data is only for an ordinal scale.
// Iternally, we are using xScale.bandwidth() to calculate the width of each <rect>
// But that method only exists on ordinal scales. Hence, the x-values being strings for now
// until we fix this issue
const validState = {
  data: [{ x: "developer", y: 40 }, { x: "ceo", y: 45 }],
  aes: ["x", "y"],
  dimensions: { width: 500, height: 300, padding: 50 }
};

test("<Rects/> renders a <g> and <rect>", () => {
  // We don't care about testing <GEOMS/> here.
  const { container } = render(
    <GEOMS {...validState}>
      <Rects />
    </GEOMS>
  );

  expect(container.firstChild).toMatchSnapshot();
});
