import { fulfill } from "./utils.js";
import { artifactError } from "./errors.js";
import {
  isArtifact,
  isArtifactArray,
  isArtifactCollection,
} from "./checkers.js";
import { pickCollection } from "./curators.js";

const artifactApplyCallback = (candidate, isArtifactCallback, applyCallback) =>
  isArtifactArray(candidate, isArtifactCallback)
    ? candidate.map(applyCallback)
    : applyCallback(candidate);

export const applyArtifact = (candidate, isArtifactCallback, applyCallback) => {
  const applyCallback_ = (candidate) =>
    artifactApplyCallback(candidate, isArtifactCallback, applyCallback);

  const error = artifactError(candidate, isArtifactCallback);

  const artifact = fulfill(
    candidate,
    isArtifact(candidate, isArtifactCallback),
    error.message,
    error.type,
  );

  return applyCallback_(artifact);
};

export const applyCollection = (
  candidate,
  isArtifactCallback,
  applyCallback,
  isArtifactCriteria=""
) => {
  const applyCallback_ = (candidate) =>
    artifactApplyCallback(candidate, isArtifactCallback, applyCallback);

  const error = artifactError(candidate, isArtifactCallback, isArtifactCriteria);

  const collection = fulfill(
    candidate,
    isArtifactCollection(candidate, isArtifactCallback),
    error.message,
    error.type,
  );

  return isArtifact(collection, isArtifactCallback)
    ? applyCallback_(collection)
    : collection.map(applyCallback_);
};

export const curateCollection = (
  candidate,
  isArtifactCallback,
  applyCallback,
  isArtifactCriteria=""
) =>
  applyCollection(
    pickCollection(candidate, isArtifactCallback),
    isArtifactCallback,
    applyCallback,
    isArtifactCriteria
  );
