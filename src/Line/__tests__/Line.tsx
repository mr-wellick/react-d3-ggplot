import * as React from "react";
import Line from "../Line";
import { GEOMS } from "../../GEOMS/";
import { render, cleanup } from "react-testing-library";

afterEach(cleanup);

const validState = {
  data: [{ x: 0, y: 0 }, { x: 10, y: 10 }],
  aes: ["x", "y"],
  dimensions: { width: 500, height: 300, padding: 50 }
};

test("Line should render a <g> element wrapping a <path> element", () => {
  const { container } = render(
    <GEOMS {...validState}>
      <Line />
    </GEOMS>
  );

  expect(container.firstChild).toMatchSnapshot();
});
