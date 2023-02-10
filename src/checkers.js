import { isArray } from "lodash";
import { are, hasTrue } from "./utils";
import { catalogArtifact } from "./curators";

export const isArtifactArray = (candidate, isArtifactCallback) =>
  isArray(candidate) ? are(candidate, isArtifactCallback) : false;

export const isArtifactItem = (candidate, isArtifactCallback) =>
  isArtifactCallback(candidate);

export const isArtifact = (candidate, isArtifactCallback) =>
  isArtifactCallback(candidate)
    ? true
    : isArtifactArray(candidate, isArtifactCallback);

export const hasArtifactItem = (candidate, isArtifactCallback) =>
  isArray(candidate) ? candidate.map(isArtifactCallback).includes(true) : false;

export const hasArtifacts = (candidate, isArtifactCallback) =>
  isArtifactItem(candidate, isArtifactCallback) ||
  hasArtifactItem(candidate, isArtifactCallback);

export const isArtifactCollection = (candidate, isArtifactCallback) => {
  return isArtifact(candidate, (x) => isArtifact(x, isArtifactCallback));
};

export const hasArtifactItemInCollection = (candidate, isArtifactCallback) => {
  const catalogCallback = (element) =>
    catalogArtifact(element, isArtifactCallback);

  return isArtifact(candidate, isArtifactCallback)
    ? true
    : isArray(candidate)
    ? candidate.map(catalogCallback).includes(true) ||
      candidate.map(catalogCallback).map(hasTrue).includes(true)
    : false;
};
