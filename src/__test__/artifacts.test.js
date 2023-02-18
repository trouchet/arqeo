import { isNumber, isString } from "lodash";

import { applyArtifact, applyCollection, curateCollection } from "../artifacts.js";

let result, expectation, candidate;

describe("artifacts", () => {
  it("must apply artifact map", () => {
    const applyCallback = (el) =>
      applyArtifact(el, isString, (str) => `string: ${str}`);

    candidate = [1];
  
    result = () => applyCallback(candidate);
    expectation = TypeError;

    expect(result).toThrow(expectation);

    candidate = ["1", "2", "3"];
    
    result = applyCallback(candidate);
    expectation = ["string: 1", "string: 2", "string: 3"];

    expect(result).toStrictEqual(expectation);

    candidate = "4";

    result = applyCallback(candidate);
    expectation = "string: 4";

    expect(result).toStrictEqual(expectation);
  });
  
  it("must apply Collection map", () => {
    const applyCallback = (el) => applyCollection(el, isNumber, (num) => 2*num);

    candidate = ["1"];
    
    result = () => applyCallback(candidate);
    expectation = TypeError;

    expect(result).toThrow(expectation);

    candidate = 42;

    result = applyCallback(candidate);
    expectation = 84;

    expect(result).toStrictEqual(expectation);

    candidate = [1, 2, 3];

    result = applyCallback(candidate);
    expectation = [2, 4, 6];

    expect(result).toStrictEqual(expectation);

    candidate = [[1, 2, 3], 4];

    result = applyCallback(candidate);
    expectation = [[2, 4, 6], 8];

    expect(result).toStrictEqual(expectation);
  });

  it("must apply Collection map", () => {
    const curateCallback = (el) => curateCollection(el, isNumber, (num) => 2*num);

    candidate = 1;

    result = curateCallback(candidate);
    expectation = 2;
    
    expect(result).toStrictEqual(expectation);

    candidate = [1, 2];

    result = curateCallback(candidate);
    expectation = [2, 4];
    
    expect(result).toStrictEqual(expectation);

    candidate = [[1, 2, 3], 4];

    result = curateCallback(candidate);
    expectation = [[2, 4, 6], 8];
    
    expect(result).toStrictEqual(expectation);

    candidate = "42";

    result = curateCallback(candidate);
    expectation = [];

    expect(result).toStrictEqual(expectation);

    candidate = [1, 2, "3"];

    result = curateCallback(candidate);
    expectation = [2, 4];

    expect(result).toStrictEqual(expectation);

    candidate = [[1, 2, "3"], "4"];

    result = curateCallback(candidate);
    expectation = [[2, 4]];

    expect(result).toStrictEqual(expectation);
  });
});
