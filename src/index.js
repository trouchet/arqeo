import {
  isArtifact,
  isArtifactCollection,
  hasArtifactItemInCollection,
} from "./checkers.js";

import { catalogCollection, pickCollection } from "./curators.js";

import { applyCollection, curateCollection } from "./artifacts.js";

export let is = isArtifact;
export let are = isArtifactCollection;
export let has = hasArtifactItemInCollection;
export let catalog = catalogCollection;
export let apply = applyCollection;
export let pick = pickCollection;
export let curate = curateCollection;
