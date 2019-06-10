import * as React from "react";
import GEOMS from "../GEOMS";
import { IContext } from "../../_context/";
import { render } from "react-testing-library";
import { cleanup } from "react-testing-library";
import { XAxis } from "../../XAxis/";
import { YAxis } from "../../YAxis/";
import { Points } from "../../Points/";

afterEach(cleanup);

const notValidState = {
  data: [{ x: 0, y: 5 }, { x: 10, y: 10 }],
  aes: ["x", "y"]
};

// data is expected to have the following shape.
const validState: IContext = {
  data: [{ x: 0, y: 5 }, { x: 10, y: 10 }], // objects in array can have arbitrary property names & multiple properties
  aes: ["x", "y"], // these correspond to the property names above that we want to visualize
  dimensions: { width: 500, height: 300, padding: 50 }
};

test("GEOMS throws an error when an invalid state object is passed in", () => {
  const node = () => {
    // @ts-ignore
    render(<GEOMS {...notValidState} />); // deliberately passed in an incorrect state shape
  };

  expect(node).toThrow();
});

test("GEOMS throws an error when no props.children are passed in", () => {
  const node = () => {
    render(<GEOMS {...validState} />);
  };

  expect(node).toThrow();
});

test("GEOMS only accepts valid react-d3-ggplot components", () => {
  const firstNode = () => {
    render(
      <GEOMS {...validState}>
        <XAxis x_path={true} />
        <div>This is an invalid child.</div>
      </GEOMS>
    );
  };

  expect(firstNode).toThrow();

  const secondNode = () => {
    render(
      <GEOMS {...validState}>
        <div>This is an invalid child.</div>
        <div>Another invalid child.</div>
      </GEOMS>
    );
  };

  expect(secondNode).toThrow();
});

test("GEOMS accepting valid components", () => {
  const { container } = render(
    <GEOMS {...validState}>
      <XAxis x_path={true} />
      <YAxis y_path={true} />
      <Points />
    </GEOMS>
  );

  // the underlying SVG markup generated above should not change when we change our code base logic!
  expect(container.firstChild).toMatchSnapshot();
});
