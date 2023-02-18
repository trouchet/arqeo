import { isArray } from "lodash";
import {
  hasArtifactItemInCollection,
  hasArtifacts,
  isArtifact,
  isArtifactItem,
} from "./checkers.js";
import { areFalse } from "./utils.js";

export const catalogArtifact = (candidate, isArtifactCallback) => {
  const catalogArtifactItem = (candidate) =>
    isArtifactItem(candidate, isArtifactCallback);

  return hasArtifacts(candidate, isArtifactCallback)
    ? isArtifactItem(candidate, isArtifactCallback)
      ? true
      : candidate.map(catalogArtifactItem)
    : false;
};

export const catalogCollection = (candidate, isArtifactCallback) => {
  const catalogCallback = (element) =>
    catalogArtifact(element, isArtifactCallback);

  return isArtifact(candidate, isArtifactCallback)
    ? catalogCallback(candidate)
    : isArray(candidate)
    ? areFalse(candidate.map(catalogCallback))
      ? false
      : candidate.map(catalogCallback)
    : false;
};

export const pickArtifact = (candidate, isArtifactCallback) => {
  return hasArtifacts(candidate, isArtifactCallback)
    ? isArtifactItem(candidate, isArtifactCallback)
      ? candidate
      : candidate.filter(isArtifactCallback)
    : [];
};

export const pickCollection = (candidate, isArtifactCallback) => {
  const pickCallback = (element) => pickArtifact(element, isArtifactCallback);
  const isEmpty = (element) => (isArray(element) ? element.length !== 0 : true);

  return hasArtifactItemInCollection(candidate, isArtifactCallback)
    ? isArtifact(candidate, isArtifactCallback)
      ? candidate
      : candidate.map(pickCallback).filter(isEmpty)
    : [];
};
