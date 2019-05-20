// ALE complains when we just use import React from "react";
import * as React from "react";
import Points from "../Points";
import { GEOMS } from "../../GEOMS/";
import { render, cleanup } from "react-testing-library";

afterEach(cleanup);

const validState = {
  data: [{ x: 0, y: 0 }, { x: 10, y: 10 }],
  aes: ["x", "y"],
  dimensions: { width: 500, height: 300, padding: 50 }
};

test("Points renders a <g> element wrapping N <point> elements", () => {
  // We don't care about testing <GEOMS/> here.
  const { container } = render(
    <GEOMS {...validState}>
      <Points />
    </GEOMS>
  );

  expect(container.firstChild).toMatchSnapshot();
});
