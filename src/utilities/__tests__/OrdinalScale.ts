import uniq from "lodash.uniq";
import OrdinalScale from "../OrdinalScale";

const data: string[] = ["tsla", "aapl", "ibm", "ko", "ko"];
const categories = uniq(data);

test("Create a categorical scale", () => {
  // create scale
  const scale = new OrdinalScale(data).getScale(0.5);
  expect(typeof scale).toBe("function");

  // check categories are in domain
  const domain = scale.domain();
  categories.forEach(category => {
    expect(domain).toContain(category);
  });

  // check category lengths are equal
  expect(domain.length).toBe(categories.length);
});
