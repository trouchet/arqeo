import {
  isArtifact,
  isArtifactCollection,
  hasArtifactItemInCollection,
} from "./checkers.js";

import { catalogCollection } from "./curators.js";

import { applyArtifact } from "./artifacts.js";

export let is = isArtifact;
export let are = isArtifactCollection;
export let has = hasArtifactItemInCollection;
export let catalog = catalogCollection;
export let apply = applyArtifact;
