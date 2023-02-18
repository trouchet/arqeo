import {
  isArtifact,
  isArtifactCollection,
  hasArtifactItemInCollection,
} from "./checkers.js";

import { catalogCollection, pickCollection } from "./curators.js";

import { applyArtifact, curateCollection } from "./artifacts.js";

export let is = isArtifact;
export let are = isArtifactCollection;
export let has = hasArtifactItemInCollection;
export let catalog = catalogCollection;
export let apply = applyArtifact;
export let pick = pickCollection;
export let curate = curateCollection;