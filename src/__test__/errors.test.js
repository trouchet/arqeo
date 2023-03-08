import { isExtensionOf } from "../utils.js";
import { artifactError, artifactErrorMessage, buildError } from "../errors.js";
import { isNumber } from "lodash";

let result, expectation;

describe("error", () => {
  it("must assert builder error", () => {
    const message = "This is an Error";
    const type = TypeError;
    const error = buildError(type, message);

    result = error.message;
    expectation = message;

    expect(result).toBe(expectation);

    result = isExtensionOf(error.type, Error);
    expectation = true;

    expect(result).toBe(expectation);
  });
});

describe("errorMessage", () => {
  it("must match artifact message snippet", () => {
    result = artifactErrorMessage([1, '2'], isNumber);
    expectation = "An artifact is ";

    expect(result).toMatch(expectation);
  });
  it("must match criteria snippet", () => {
    const criteria = "These are item criteria.";

    result = artifactErrorMessage([1, '2'], isNumber, criteria);
    expectation = criteria;

    expect(result).toMatch(expectation);
  });
});

describe("error", () => {
  it("must assert artifact error properties", () => {
    const message = "These are criteria!";
    const error = artifactError([1, '2'], isNumber, message);

    result = error.message;
    expectation = message;

    expect(result).toMatch(expectation);

    result = isExtensionOf(error.type, Error);
    expectation = true;

    expect(result).toBe(expectation);

    result = error.type;
    expectation = TypeError;

    expect(result).toBe(expectation);
  });
  it("must assert artifact with missing message", () => {
    const error = artifactError([1, '2'], isNumber, );

    result = error.message;
    expectation = "artifact";

    expect(result).toMatch(expectation);
  });
  it("must throw TypeError on ErrorClass", () => {
    class NotErrorClass {}

    const errorClassThrow = () =>
      buildError(NotErrorClass, "Ceci n'est pas une pipe.");
    expect(errorClassThrow).toThrow(TypeError);

    const errorMessageThrow = () => buildError(Error, Error);
    expect(errorMessageThrow).toThrow(TypeError);
  });
});
