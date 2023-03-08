const aqo = require("arqeo");
const _ = require("lodash");

const { is, are, has, catalog, apply, pick, curate } = aqo;

/**
 *
 **/
const print = (question, answer) => {
  console.log(`${question} ${answer}`);
};

const experiment = (
  candidate,
  artifactMap,
  artifactMapDescription,
  isCallback,
  isDescription,
) => {
  const candidateStr = JSON.stringify(candidate);

  const question = `${artifactMapDescription} candidate ${candidateStr} ${isDescription}?`;
  const answer = JSON.stringify(artifactMap(candidate, isCallback));

  return {
    question: question,
    answer: answer,
  };
};

const report = (
  candidate,
  artifactMap,
  artifactMapDescription,
  isCallback,
  isDescription,
) => {
  let quest;

  quest = experiment(
    candidate,
    artifactMap,
    artifactMapDescription,
    isCallback,
    isDescription,
  );
  print(quest.question, quest.answer);
};

const validNumberArtifact = [1, 2, 3];
const invalidNumberArtifact = [1, 2, "3"];

const validNumberCollection = [1, [1, 2, 3]];
const invalidNumberCollection = [1, [1, 2, "3"]];

report(validNumberArtifact, is, "Is", _.isNumber, "a number artifact");
report(invalidNumberArtifact, is, "Is", _.isNumber, "a number artifact");

report(validNumberCollection, are, "Are", _.isNumber, "a number collection");
report(invalidNumberCollection, are, "Are", _.isNumber, "a number collection");

report(validNumberCollection, has, "Has", _.isString, "a string item");
report(invalidNumberCollection, has, "Has", _.isString, "a string item");

report(validNumberCollection, catalog, "Catalog", _.isString, "as string items");
report(validNumberCollection, catalog, "Catalog", _.isNumber, "as number items");

const doubleMap = (num) => 2 * num;
let applyMap;

applyMap = (candidate, isArtifactCallback) =>
  apply(candidate, isArtifactCallback, doubleMap);

report(validNumberArtifact, applyMap, "Apply", _.isNumber, "on number artifact");
report(validNumberCollection, applyMap, "Apply", _.isNumber, "on number collection");

report(invalidNumberArtifact, pick, "Pick", _.isNumber, "on number artifact");

let curateMap;

curateMap = (candidate, isArtifactCallback) =>
  curate(candidate, isArtifactCallback, doubleMap);

report(invalidNumberArtifact, curateMap, "Curate", _.isNumber, "as number artifact");

try {
  report(invalidNumberArtifact, applyMap, "Apply", _.isNumber, "on number artifact");
} catch(e) {
  console.log(`You tried to apply function ${doubleMap} on artifact ${JSON.stringify(invalidNumberArtifact)}. It threw the error below:`);
  console.log(e);
}
