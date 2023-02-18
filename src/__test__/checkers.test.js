import { isNumber, isString } from "lodash";

import {
  isArtifactItem,
  isArtifactArray,
  hasArtifactItem,
  hasArtifacts,
  isArtifactCollection,
  hasArtifactItemInCollection,
} from "../checkers.js";

let result, expectation, candidate;

describe("artifacts", () => {
  it("must assert artifact item", () => {
    candidate = ["1", "2", "3", "4"];

    result = isArtifactItem(candidate, isString);

    expectation = false;

    expect(result).toBe(expectation);

    result = isArtifactItem("1", isString);
    expectation = true;

    expect(result).toBe(expectation);
  });

  it("must assert artifact array", () => {
    candidate = ["1", "2", "3", "4"];

    result = isArtifactArray(candidate, isString);
    expectation = true;

    expect(result).toBe(expectation);

    result = isArtifactArray("1", isString);
    expectation = false;

    expect(result).toBe(expectation);
  });

  it("must assert artifact collections", () => {
    const collectionCallback = (candidate) =>
      isArtifactCollection(candidate, isString);

    candidate = [[1, 2], 3];
    result = isArtifactCollection(candidate, isNumber);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = "42";

    result = collectionCallback(candidate);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = ["1", "2"];

    result = collectionCallback(candidate);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = ["42", ["1", "2"]];

    result = collectionCallback(candidate);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = 42;

    result = collectionCallback(candidate);
    expectation = false;

    expect(result).toBe(expectation);

    candidate = ["1", 2];

    result = collectionCallback(candidate);
    expectation = false;

    expect(result).toBe(expectation);

    candidate = [42, ["1", "2"]];

    result = collectionCallback(candidate);
    expectation = false;

    expect(result).toBe(expectation);
  });

  it("must check for existence of valid items", () => {
    let candidate = [1, 2, 3, "4"];

    result = hasArtifactItem(candidate, isString);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = [1, 2, 3, 4];

    result = hasArtifactItem(candidate, isString);
    expectation = false;

    expect(result).toBe(expectation);
  });

  it("must check for existence of valid items", () => {
    const hasItemCallback = (el) => hasArtifactItemInCollection(el, isString);

    candidate = 42;

    result = hasItemCallback(candidate);
    expectation = false;

    expect(result).toBe(expectation);

    candidate = "42";

    result = hasItemCallback(candidate);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = ["7", "42"];

    result = hasItemCallback(candidate);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = ["42", 42];

    result = hasItemCallback(candidate);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = [42, 42];

    result = hasItemCallback(candidate);
    expectation = false;

    expect(result).toBe(expectation);

    candidate = [42, [42, 42]];

    result = hasItemCallback(candidate);
    expectation = false;

    expect(result).toBe(expectation);

    candidate = ["42", [42, 42]];

    result = hasItemCallback(candidate);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = [42, ["42", 42]];

    result = hasItemCallback(candidate);
    expectation = true;

    expect(result).toBe(expectation);
  });

  it("must check for existence of valid items", () => {
    const hasCallback = (candidate) => hasArtifacts(candidate, isString);

    candidate = [1, 2, 3, "4"];

    result = hasCallback(candidate);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = [1, 2, 3, "4"];

    result = hasCallback(candidate);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = [1, 2, 3, 4];

    result = hasCallback(candidate);
    expectation = false;

    expect(result).toBe(expectation);

    candidate = "4";

    result = hasCallback(candidate);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = 1;

    result = hasCallback(candidate);
    expectation = false;

    expect(result).toBe(expectation);
  });
});
