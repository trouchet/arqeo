import { isString } from "lodash";

import { applyArtifact } from "../artifacts.js";

let result, expectation, candidate;

describe("artifacts", () => {
  it("must apply artifact map", () => {
    const applyCallback = (el) =>
      applyArtifact(el, isString, (str) => `string: ${str}`);

    candidate = ["1", "2", "3", "4"];

    result = applyCallback(candidate);
    expectation = ["string: 1", "string: 2", "string: 3", "string: 4"];

    expect(result).toStrictEqual(expectation);

    candidate = "4";

    result = applyCallback(candidate);
    expectation = "string: 4";

    expect(result).toStrictEqual(expectation);
  });
});
