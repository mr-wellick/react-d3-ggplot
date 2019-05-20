import * as React from "react";
import GGPLOT from "../GGPLOT";
import { Line } from "../../Line/";
import { Points } from "../../Points/";
// need to test rects first before we can us it!
// import { Rects } from "../../Rects/";
import { render, cleanup } from "react-testing-library";

afterEach(cleanup);

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

test("Passing an invalid state shape should fail", () => {
  // @ts-ignore
  const node = () => render(<GGPLOT {...invalidState} />);

  expect(node).toThrow();
});

test("Passing no child into GGPLOT should work just fine and render only the XAxis and YAxis", () => {
  const { container } = render(<GGPLOT {...validState} />);

  // the underlying SVG markup generated above should not change when we change our code base logic!
  expect(container.firstChild).toMatchSnapshot();
});

test("GGPLOT can only accept one of the following: Line, Points, and Rects", () => {
  const firstNode = () =>
    render(
      <GGPLOT {...validState}>
        <div>Invalid child</div>
      </GGPLOT>
    );
  expect(firstNode).toThrow();

  const secondNode = () =>
    render(
      // @ts-ignore
      <GGPLOT {...validState}>
        <div />
        <div />
        <div />
      </GGPLOT>
    );
  expect(secondNode).toThrow();
});

test("GGPLOT accepting ONE valid component", () => {
  const firstNode = render(
    <GGPLOT {...validState}>
      <Line />
    </GGPLOT>
  );
  // the underlying SVG markup generated above should not change when we change our code base logic!
  expect(firstNode.container.firstChild).toMatchSnapshot();

  const secondNode = render(
    <GGPLOT {...validState}>
      <Points />
    </GGPLOT>
  );
  // the underlying SVG markup generated above should not change when we change our code base logic!
  expect(secondNode.container.firstChild).toMatchSnapshot();
});
