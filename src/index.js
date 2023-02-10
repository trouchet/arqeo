import { 
    isArtifact, 
    isArtifactCollection,
    hasArtifactItemInCollection 
} from "./checkers";

import { 
    catalogCollection 
} from "./curators";

import { applyArtifact } from "./artifacts";

export let is = isArtifact;
export let has = hasArtifactItemInCollection;
export let are = isArtifactCollection;
export let catalog = catalogCollection;
export let apply = applyArtifact;


