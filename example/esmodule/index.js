import aqo from "arqeo";
import _ from "lodash";

const { is, are, has, catalog, apply, pick } = aqo;

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

report([1, 2, 3], is, "Is", _.isNumber, "a number artifact");
report([1, 2, "3"], is, "Is", _.isNumber, "a number artifact");

report([1, [1, 2, 3]], are, "Are", _.isNumber, "a number collection");
report([1, [1, 2, "3"]], are, "Are", _.isNumber, "a number collection");

report([1, [1, 2, 3]], has, "Has", _.isString, "a string item");
report([1, [1, 2, "3"]], has, "Has", _.isString, "a string item");

report([1, [1, 2, 3]], catalog, "Catalog", _.isString, "as string items");
report([1, [1, 2, 3]], catalog, "Catalog", _.isNumber, "as number items");

const doubleMap = (num) => 2 * num;
let applyMap;

applyMap = (candidate, isArtifactCallback) =>
  apply(candidate, isArtifactCallback, doubleMap);

report([1, 2, 3], applyMap, "Apply", _.isNumber, "on number artifact");
report([1, 2, "3"], pick, "Pick", _.isNumber, "on number artifact");

applyMap = (candidate, isArtifactCallback) => {
  return apply(pick(candidate, isArtifactCallback), isArtifactCallback, doubleMap)
};

report([1, 2, "3"], applyMap, "Pick and apply", _.isNumber, "on mixed number-string artifact");
