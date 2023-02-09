![investigate yourself](https://raw.githubusercontent.com/trouchet/arqeo/main/images/arqheo_tiny.png)
# Arqeo

This npm module aims to give a development tools for items condition-check. The behavior emulates, for example, Typescript type-check. 

The object-concepts are:

1. __Artifact__: an item or array that fulfills certain boolean-condition;
2. __Collection__: An artifact or array of artifacts.

The callback-concepts are:

1. __isArtifactCallback__: 1-input/boolean-output function for respective artifact item or array; 
2. __applyCallback__: 1-input/any-output function to apply on respective artifact item or array; 

The checker-concepts are:

1. __isArtifact{Item|Array|Collection}__: validates a artifact-`candidate` with `isArtifactCallback`-function; 
2. __hasArtifactItem__: verifies if artifact array-candidate has valid items;
3. __hasArtifacts__: verifies if artifact-candidate has valid items;

The catalog-concepts are:

1. __catalog{ArtifactItems|ArtifactsInCollection}__: applies `isArtifactCallback` on potential artifact-elements to validate each item individually.  

The interested reader may access use-cases described above on test files available on URLs below: 

1. __Artifacts__: https://github.com/trouchet/arqeo/blob/main/src/__test__/artifacts.test.js
2. __Checkers and transformers__: https://github.com/trouchet/arqeo/blob/main/src/__test__/curators.test.js

