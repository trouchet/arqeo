import { isString } from "lodash";
import { catalogCollection } from "./curators.js";
import { fulfill, isExtensionOf } from "./utils.js";

const DEFAULT_CRITERIA = "";

export const buildError = (errorClass, errorMessage) => {
  return {
    message: fulfill(
      errorMessage,
      isString(errorMessage),
      "Error message must be a string!",
      TypeError,
    ),
    type: fulfill(
      errorClass,
      isExtensionOf(errorClass, Error),
      "Error type must extend Error class!",
      TypeError,
    ),
  };
};

export const artifactErrorMessage = (candidate, isCallback, ItemCriteria = DEFAULT_CRITERIA) => {
  const catalogedCollection = catalogCollection(candidate, isCallback);
  
  const artifactCriterium = "either an item or array of items with true-return callback";
  const descriptionPreamble = `An artifact is ${artifactCriterium}. `;

  const statement = `Candidate catalog output is ${JSON.stringify(catalogedCollection)}`;
  const legend = "\'false\' stands for non-fulfilling artifacts is-callback";
  const catalogDescription = `${statement}, where ${legend}`

  const description = descriptionPreamble + catalogDescription + "\n";

  return description + ItemCriteria;
};

const buildArtifactError = (candidate, isCallback, ItemCriteria = DEFAULT_CRITERIA) =>
  buildError(TypeError, artifactErrorMessage(candidate, isCallback, ItemCriteria));

export const artifactError = (candidate, isCallback, ItemCriteria = DEFAULT_CRITERIA) => {
  return buildArtifactError(candidate, isCallback, ItemCriteria);
};

