import * as React from "react";
import { render, cleanup } from "react-testing-library";
import FACETS from "../FACETS";
import { Points } from "../../Points/";

// when using facets, we need to have an array of arrays containing objects.
// each entry in the array represents a graph
const DataForFacets = [
  [{ year: 1999, x: 0, y: 0 }, { year: 1999, x: 10, y: 10 }],
  [{ year: 2005, x: 0, y: 0 }, { year: 2005, x: 28, y: 15 }]
];

const validState = {
  data: DataForFacets,
  aes: ["x", "y"],
  dimensions: { width: 500, height: 400, padding: 50 }
};

test("Should render two scatterplots charts", () => {
  const node = render(
    <FACETS {...validState}>
      <Points />
    </FACETS>
  );
});

test("The underlying markup should not change as we change our logic in the code base unless we change the markup ourselves", () => {
  const { container } = render(
    <FACETS {...validState}>
      <Points />
    </FACETS>
  );

  expect(container).toMatchSnapshot();
});
