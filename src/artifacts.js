import { fulfill } from "./utils";
import { artifactError } from "./errors";
import { isArtifact_, isArtifactArray } from "./checkers";

export const applyArtifact = (candidate, isArtifactCallback, applyCallback) => {
  const artifactApplyCallback = (candidate) =>
    isArtifactArray(candidate, isArtifactCallback) ? 
    candidate.map(applyCallback) : 
    applyCallback(candidate);
  
  const error = artifactError("Provided candidate does not fulfill artifact is-callback");

  return artifactApplyCallback(
    fulfill(candidate, isArtifact_(candidate, isArtifactCallback), error.message, error.type)
  );
}
