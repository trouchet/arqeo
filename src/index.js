import { 
    isArtifact, 
    hasArtifacts,
    isArtifactCollection,
    hasArtifactItemInCollection 
} from "./checkers";

import { 
    catalogArtifactItems, 
    catalogArtifactsInCollection 
} from "./curators";

import { applyArtifact } from "./artifacts";

export let isArtifact = isArtifact;
export let hasArtifacts = hasArtifacts;
export let isArtifactCollection = isArtifactCollection;
export let hasArtifactItemInCollection = hasArtifactItemInCollection;

export let catalogArtifactItems = catalogArtifactItems;
export let catalogArtifactsInCollection = catalogArtifactsInCollection;

export let applyArtifact = applyArtifact;
