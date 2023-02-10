import { isArray } from "lodash";
import { are, hasTrue } from "./utils";
import { catalogArtifactItems } from "./curators";


export const isArtifactArray = (candidate, isArtifactCallback) =>
  isArray(candidate) ? are(candidate, isArtifactCallback) : false;

export const isArtifactItem = (candidate, isArtifactCallback) => isArtifactCallback(candidate);

export const isArtifact_ = (candidate, isArtifactCallback) =>
  isArtifactCallback(candidate) ? true : isArtifactArray(candidate, isArtifactCallback);

export const hasArtifactItem = (candidate, isArtifactCallback) =>
  isArray(candidate) ?  
  candidate.map(isArtifactCallback).includes(true) : 
  false;

export const hasArtifacts_ = (candidate, isArtifactCallback) =>
  isArtifactItem(candidate, isArtifactCallback) || 
  hasArtifactItem(candidate, isArtifactCallback);

export const isArtifactCollection = (candidate, isArtifactCallback) => {
  return isArtifact_(candidate, (x) => isArtifact_(x, isArtifactCallback));
};

export const hasArtifactItemInCollection = (candidate, isArtifactCallback) => {
  const catalogCallback = (element) => catalogArtifactItems(element, isArtifactCallback);
  
  return isArtifact_(candidate, isArtifactCallback)  ? 
  true : (
    isArray(candidate) ? 
    candidate.map(catalogCallback).includes(true) || 
    candidate.map(catalogCallback).map(hasTrue).includes(true) : 
    false
  );
};