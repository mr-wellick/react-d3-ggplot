import React from "react";
import Background from "../Background";
import { GEOMS } from "../../GEOMS";
import { render } from "react-testing-library";
import { cleanup } from "react-testing-library";

afterEach(cleanup);

// here we only care about the dimensions property.
// <Background /> only needs dimensions object
const validState = {
  data: [],
  aes: [],
  dimensions: { width: 500, height: 300, padding: 50 }
};

test("<Background/> renders rect element", () => {
  // <Background/> is not intended to be used as a stand-alone componet, yet.
  // When using background, users must use it within <GEOMS/>
  const { container } = render(
    <GEOMS {...validState}>
      <Background />
    </GEOMS>
  );

  // If we change the code, the HTML structure should not change!
  expect(container.firstChild).toMatchSnapshot();
});
