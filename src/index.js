import { 
    isArtifact_, 
    isArtifactCollection,
    hasArtifactItemInCollection 
} from "./checkers";

import { 
    catalogArtifactsInCollection 
} from "./curators";

import { applyArtifact } from "./artifacts";

export let is = isArtifact_;
export let has = hasArtifactItemInCollection;
export let isCollection = isArtifactCollection;
export let apply = applyArtifact;
export let catalog = catalogArtifactsInCollection;

