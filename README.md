![investigate yourself](https://raw.githubusercontent.com/trouchet/arqeo/main/images/arqheo_tiny.png)
# Arqeo
[![Version](https://img.shields.io/npm/v/arqeo.svg)](https://www.npmjs.com/package/arqeo)
[![codecov](https://codecov.io/gh/trouchet/arqeo/branch/main/graph/badge.svg?token=55H8MVEJQJ)](https://codecov.io/gh/trouchet/arqeo)
[![downloads](https://img.shields.io/npm/dm/arqeo)](https://www.npmjs.com/package/arqeo)

## Concepts

This npm module aims to give a development tools for items condition-check. The behavior emulates, for example, Typescript type-check. 

The object-concepts are:

1. __Artifact__: an item or array that fulfills certain boolean-condition;
2. __Collection__: An artifact or array of artifacts.

The callback-concepts are:

1. __isArtifactCallback__: 1-input/boolean-output function for respective artifact item or array; 
2. __applyCallback__: 1-input/any-output function to apply on respective artifact item or array; 

The checker-concepts are:

1. __is__: validates `candidate` with `isArtifactCallback`-function to verify it is an artifact; 
2. __are__: verifies if `candidate` with `isArtifactCallback`-function to verify it is a collection;
3. __has__: verifies if `candidate` has valid artifact items;

The catalog-concepts are:

1. __catalog__: applies `isArtifactCallback` on potential {artifact, collection}-elements to validate each item individually.  

The transform-concepts are:

1. __apply__: applies `applyCallback`-function on artifact-candidate with validation of `isArtifactCallback`-function.

## Use cases

The interested reader may access use-cases described above on test files available on code folders below: 

1. __Artifacts__: src/\_\_test\_\_/artifacts.test.js
2. __Checkers__: src/\_\_test\_\_/checkers.test.js
3. __Curators__: src/\_\_test\_\_/curators.test.js

