import { isArray } from "lodash";
import { hasArtifacts, isArtifact, isArtifactItem } from "./checkers.js";
import { areFalse } from "./utils.js";

export const catalogArtifact = (candidate, isArtifactCallback) => {
  const catalogArtifactItem = (candidate) =>
    isArtifactItem(candidate, isArtifactCallback);

  return hasArtifacts(candidate, isArtifactCallback)
    ? isArtifactItem(candidate, isArtifactCallback)
      ? [true]
      : candidate.map(catalogArtifactItem)
    : false;
};

export const catalogCollection = (candidate, isArtifactCallback) => {
  const catalogCallback = (element) =>
    catalogArtifact(element, isArtifactCallback);

  return isArtifact(candidate, isArtifactCallback)
    ? catalogArtifact(candidate, isArtifactCallback)
    : isArray(candidate)
    ? areFalse(candidate.map(catalogCallback))
      ? false
      : candidate.map(catalogCallback)
    : false;
};
