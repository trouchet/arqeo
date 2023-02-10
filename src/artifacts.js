import { fulfill } from "./utils.js";
import { artifactError } from "./errors.js";
import { isArtifact, isArtifactArray } from "./checkers.js";

export const applyArtifact = (candidate, isArtifactCallback, applyCallback) => {
  const artifactApplyCallback = (candidate) =>
    isArtifactArray(candidate, isArtifactCallback)
      ? candidate.map(applyCallback)
      : applyCallback(candidate);

  const error = artifactError(
    "Provided candidate does not fulfill artifact is-callback",
  );

  return artifactApplyCallback(
    fulfill(
      candidate,
      isArtifact(candidate, isArtifactCallback),
      error.message,
      error.type,
    ),
  );
};
