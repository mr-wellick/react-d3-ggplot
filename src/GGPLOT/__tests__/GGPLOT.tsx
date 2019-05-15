import React from "react";
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

test("Passing an invalid state being should fail", () => {
  // @ts-ignore
  const node = () => render(<GGPLOT {...invalidState} />);

  expect(node).toThrow();
});

test("Passing no child into <GGPLOT/> should work just fine and render only the XAxis and YAxis", () => {
  const { container } = render(<GGPLOT {...validState} />);

  expect(container.firstChild).toMatchSnapshot();
});

test("<GGPLOT/> can only accept <Line/>, <Points/>, and <Rects/> for now", () => {
  const firstNode = () =>
    render(
      <GGPLOT {...validState}>
        <div />
      </GGPLOT>
    );

  expect(firstNode).toThrow();
});

test("<GGPLOT/> only accept ONE valid component: <Line/>, <Points/>, <Rects/>", () => {
  const firstNode = () =>
    render(
      // @ts-ignore
      <GGPLOT {...validState}>
        <div />
        <div />
        <div />
      </GGPLOT>
    );

  expect(firstNode).toThrow();
});

test("<GGPLOT/> does not accept multiple valid components: <Line/>, <Points/>, and <Rects/>", () => {
  const node = () =>
    render(
      // @ts-ignore
      <GGPLOT {...validState}>
        <Line />
        <Line />
      </GGPLOT>
    );

  expect(node).toThrow();
});

test("Passing a valid component to <GGPLOT/> ", () => {
  const firstNode = render(
    <GGPLOT {...validState}>
      <Line />
    </GGPLOT>
  );

  const secondNode = render(
    <GGPLOT {...validState}>
      <Points />
    </GGPLOT>
  );
});
