import { fulfill } from "./utils.js";
import { artifactError } from "./errors.js";
import { isArtifact, isArtifactArray, isArtifactCollection, isArtifactItem } from "./checkers.js";

const error = artifactError(
  "Provided candidate does not fulfill artifact is-callback",
);

const artifactApplyCallback = (candidate, isArtifactCallback, applyCallback) =>
    isArtifactArray(candidate, isArtifactCallback)
      ? candidate.map(applyCallback)
      : applyCallback(candidate);

export const applyArtifact = (candidate, isArtifactCallback, applyCallback) => {
  const applyCallback_ = (candidate) => 
    artifactApplyCallback(candidate, isArtifactCallback, applyCallback);

  const artifact = fulfill(
    candidate, isArtifact(candidate, isArtifactCallback), 
    error.message, error.type,
  )

  return applyCallback_(artifact);
};

export const applyCollection = (candidate, isArtifactCallback, applyCallback) => {
  const applyCallback_ = (candidate) => 
    artifactApplyCallback(candidate, isArtifactCallback, applyCallback);
  
  const collection = fulfill(
    candidate, isArtifactCollection(candidate, isArtifactCallback),
    error.message, error.type,
  );
  
  return isArtifact(collection, isArtifactCallback) ? 
    applyCallback_(collection) : collection.map(applyCallback_);
};