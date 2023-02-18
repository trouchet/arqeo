import { isString } from "lodash";
import { catalogArtifact, catalogCollection, pickArtifact, pickCollection } from "../curators.js";

let result, expectation, candidate;

describe("Artifact", () => {
  it("must check for existence of valid items", () => {
    const catalogCallback = (candidate) => catalogArtifact(candidate, isString);
    
    candidate = [1, 2, 3, "4"];

    result = catalogCallback(candidate);
    expectation = [false, false, false, true];

    expect(result).toStrictEqual(expectation);

    candidate = [1, 2, 3, 4];

    result = catalogCallback(candidate);
    expectation = false;

    expect(result).toStrictEqual(expectation);

    candidate = 42;

    result = catalogCallback(candidate);
    expectation = false;

    expect(result).toStrictEqual(expectation);

    candidate = "42";

    result = catalogCallback(candidate);
    expectation = true;

    expect(result).toStrictEqual(expectation);
  });

  it("must check for existence of valid items", () => {
    const pickCallback = (el) => pickArtifact(el, isString);

    candidate = [1, 2, 3, "4"];

    result = pickCallback(candidate);
    expectation = ["4"];

    expect(result).toStrictEqual(expectation);

    candidate = [1, 2, 3, 4];

    result = pickCallback(candidate);
    expectation = [];

    expect(result).toStrictEqual(expectation);

    candidate = 42;

    result = pickCallback(candidate);
    expectation = [];

    expect(result).toStrictEqual(expectation);

    candidate = "42";

    result = pickCallback(candidate);
    expectation = candidate;

    expect(result).toStrictEqual(expectation);
  });

  it("must check for existence of valid items", () => {
    const catalogCallback = (el) => catalogCollection(el, isString);

    candidate = "42";

    result = catalogCallback(candidate);
    expectation = true;

    expect(result).toStrictEqual(expectation);

    candidate = ["7", "42"];

    result = catalogCallback(candidate);
    expectation = [true, true];

    expect(result).toStrictEqual(expectation);

    candidate = 42;

    result = catalogCallback(candidate);
    expectation = false;

    expect(result).toStrictEqual(expectation);

    candidate = ["42", 42];

    result = catalogCallback(candidate);
    expectation = [true, false];

    expect(result).toStrictEqual(expectation);

    candidate = [42, 42];

    result = catalogCallback(candidate);
    expectation = false;

    expect(result).toStrictEqual(expectation);

    candidate = [42, [42, 42]];

    result = catalogCallback(candidate);
    expectation = false;

    expect(result).toStrictEqual(expectation);

    candidate = ["42", [42, 42]];

    result = catalogCallback(candidate);
    expectation = [true, false];

    expect(result).toStrictEqual(expectation);

    candidate = [42, ["42", 42]];

    result = catalogCallback(candidate);
    expectation = [false, [true, false]];

    expect(result).toStrictEqual(expectation);
  });

  it("must check for existence of valid items", () => {
    const pickCallback = (el) => pickCollection(el, isString);

    candidate = [42, ["42", 42]];
    
    result = pickCallback(candidate);
    expectation = [["42"]];
    
    expect(result).toStrictEqual(expectation);

    candidate = "42";

    result = pickCallback(candidate);
    expectation = candidate;

    expect(result).toStrictEqual(expectation);

    candidate = ["7", "42"];

    result = pickCallback(candidate);
    expectation = candidate;

    expect(result).toStrictEqual(expectation);

    candidate = 42;

    result = pickCallback(candidate);
    expectation = [];

    expect(result).toStrictEqual(expectation);

    candidate = ["42", 42];

    result = pickCallback(candidate);
    expectation = ["42"];
    
    expect(result).toStrictEqual(expectation);

    candidate = [42, 42];

    result = pickCallback(candidate);
    expectation = [];

    expect(result).toStrictEqual(expectation);

    candidate = [42, [42, 42]];

    result = pickCallback(candidate);
    expectation = [];

    expect(result).toStrictEqual(expectation);

    candidate = ["42", [42, 42]];

    result = pickCallback(candidate);
    expectation = ["42"];

    expect(result).toStrictEqual(expectation);
  });
});
