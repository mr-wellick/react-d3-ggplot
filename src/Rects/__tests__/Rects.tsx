// ALE complains when we just use import React from "react";
import React from "react";
import Rects from "../Rects";
import { GEOMS } from "../../GEOMS/";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

const validStateForCategories = {
  data: [{ x: "developer", y: 40 }, { x: "ceo", y: 45 }],
  aes: ["x", "y"],
  dimensions: { width: 500, height: 300, padding: 50 }
};

test("Rects works best if your x-values are categories", () => {
  const { container } = render(
    <GEOMS {...validStateForCategories}>
      <Rects />
    </GEOMS>
  );

  expect(container.firstChild).toMatchSnapshot();
});

const validStateForNumbers = {
  data: [{ x: 5, y: 40 }, { x: 1, y: 45 }],
  aes: ["x", "y"],
  dimensions: { width: 500, height: 300, padding: 50 }
};

test("Rects will accept x-values that are numbers", () => {
  // this will work but users should consider other plots!
  // the plots that may be rendered can possibly be illegible!
  // will consider throwing an error instead down the line
  const { container } = render(
    <GEOMS {...validStateForNumbers}>
      <Rects />
    </GEOMS>
  );
});

const validStateForDates = {
  data: [{ x: new Date(2010), y: 40 }, { x: new Date(2020), y: 45 }],
  aes: ["x", "y"],
  dimensions: { width: 500, height: 300, padding: 50 }
};

test("Rects will accept x-values that are JS date objects", () => {
  // this will work but users should consider other plots!
  // the plots that may be rendered can possibly be illegible!
  // will consider throwing an error instead down the line
  const { container } = render(
    <GEOMS {...validStateForDates}>
      <Rects />
    </GEOMS>
  );
});
