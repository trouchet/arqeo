import { isString } from "lodash";

import { 
  isArtifactItem, 
  isArtifactArray,
  hasArtifactItem,
  hasArtifacts,
  isArtifactCollection,
  applyArtifact
} from "../artifacts";

let result, expectation, candidate;

describe("artifacts", () => {
  it(
    "must assert artifact item", 
    () => {
      candidate = ["1", "2", "3", "4"];
      
      result = isArtifactItem(candidate, isString)

      expectation = false;

      expect(result).toBe(expectation);

      result = isArtifactItem("1", isString)
      expectation = true;

      expect(result).toBe(expectation);
    }
  );

  it(
    "must assert artifact array", 
    () => {
      candidate = ["1", "2", "3", "4"];
      
      result = isArtifactArray(candidate, isString)
      expectation = true;

      expect(result).toBe(expectation);

      result = isArtifactArray("1", isString)
      expectation = false;

      expect(result).toBe(expectation);
    }
  );

  it(
    "must assert artifact collections", 
    () => {
      const collectionCallback = (candidate) => isArtifactCollection(candidate, isString);
      
      candidate = "42";
      
      result = collectionCallback(candidate)
      expectation = true;

      expect(result).toBe(expectation);

      candidate = ["1", "2"];
      
      result = collectionCallback(candidate)
      expectation = true;

      expect(result).toBe(expectation);

      candidate = ["42", ["1", "2"]];
      
      result = collectionCallback(candidate)
      expectation = true;

      expect(result).toBe(expectation);

      candidate = 42;
      
      result = collectionCallback(candidate)
      expectation = false;

      expect(result).toBe(expectation);

      candidate = ["1", 2];
      
      result = collectionCallback(candidate)
      expectation = false;

      expect(result).toBe(expectation);

      candidate = [42, ["1", "2"]];
      
      result = collectionCallback(candidate)
      expectation = false;

      expect(result).toBe(expectation);
    }
  );

  it(
    "must check for existence of valid items", 
    () => {
      let candidate = [1, 2, 3, "4"];
      
      result = hasArtifactItem(candidate, isString);
      expectation = true;

      expect(result).toBe(expectation);
      
      candidate = [1, 2, 3, 4];
      
      result = hasArtifactItem(candidate, isString);
      expectation = false;

      expect(result).toBe(expectation);
    }
  );

  it(
    "must check for existence of valid items", 
    () => {
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
    }
  );

  it(
    "must apply artifact map", 
    () => {
      const applyCallback = (el) => applyArtifact(el, isString, (str) => `string: ${str}`);

      candidate = ['1', '2', '3', '4'];

      result = applyCallback(candidate);
      expectation = ['string: 1', 'string: 2', 'string: 3', 'string: 4'];
    
      expect(result).toStrictEqual(expectation);

      candidate = '4';

      result = applyCallback(candidate);
      expectation = 'string: 4';
      
      expect(result).toStrictEqual(expectation);
    }
  );
  
});
