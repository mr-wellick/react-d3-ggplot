import React from "react";
import { render, cleanup } from "@testing-library/react";
import { GEOMS } from "../../GEOMS/";
import YGrid from "../YGrid";

afterEach(cleanup);

const validState = {
  data: [{ x: 0, y: 0 }, { x: 10, y: 10 }],
  aes: ["x", "y"],
  dimensions: { width: 500, height: 400, padding: 50 }
};

test("Should render multiple <line> elements", () => {
  const node = render(
    <GEOMS {...validState}>
      <YGrid />
    </GEOMS>
  );
});

test("Underlyng markup should not change as we change our logic in code base unless we chage the markup ourselves", () => {
  const { container } = render(
    <GEOMS {...validState}>
      <YGrid />
    </GEOMS>
  );

  expect(container.firstChild).toMatchSnapshot();
});
