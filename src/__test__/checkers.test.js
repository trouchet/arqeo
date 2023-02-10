import { isString } from "lodash";

import {
  isArtifactItem,
  isArtifactArray,
  hasArtifactItem,
  hasArtifacts,
  isArtifactCollection,
  hasArtifactItemInCollection,
} from "../checkers";

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
    const hasArtifactItem_ = (el) => hasArtifactItemInCollection(el, isString);

    candidate = 42;

    result = hasArtifactItem_(candidate);
    expectation = false;

    expect(result).toBe(expectation);

    candidate = "42";

    result = hasArtifactItem_(candidate);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = ["7", "42"];

    result = hasArtifactItem_(candidate);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = ["42", 42];

    result = hasArtifactItem_(candidate);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = [42, 42];

    result = hasArtifactItem_(candidate);
    expectation = false;

    expect(result).toBe(expectation);

    candidate = [42, [42, 42]];

    result = hasArtifactItem_(candidate);
    expectation = false;

    expect(result).toBe(expectation);

    candidate = ["42", [42, 42]];

    result = hasArtifactItem_(candidate);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = [42, ["42", 42]];

    result = hasArtifactItem_(candidate);
    expectation = true;

    expect(result).toBe(expectation);
  });

  it("must check for existence of valid items", () => {
    candidate = [1, 2, 3, "4"];

    result = hasArtifacts(candidate, isString);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = [1, 2, 3, 4];

    result = hasArtifacts(candidate, isString);
    let args = [1, 2, 3, "4"];

    result = hasArtifacts(args, isString);
    expectation = true;

    expect(result).toBe(expectation);

    args = [1, 2, 3, 4];

    result = hasArtifacts(args, isString);
    expectation = false;

    expect(result).toBe(expectation);

    candidate = "4";

    result = hasArtifacts(candidate, isString);
    expectation = true;

    expect(result).toBe(expectation);

    candidate = 1;

    result = hasArtifacts(candidate, isString);
    expectation = false;

    expect(result).toBe(expectation);
  });
});
