"use strict";

const TYPES = {
  ERROR: "error",
  INFO: "info",
};

const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "Sorry, error in the program!",
    type: TYPES.ERROR,
  }),
  NOT_FOUND: (key, value) => ({
    message: `No turtle found with ${key} ${value}`,
    type: TYPES.INFO,
  }),
  INSERT_OK: (key, value) => ({
    message: `The turtle with ${key} ${value} has been added. `,
    type: TYPES.INFO,
  }),
  NOT_INSERTED: () => ({
    message: "The turtle was not inserted.",
    type: TYPES.ERROR,
  }),
  ALREADY_IN_USE: (key, value) => ({
    message: `${key} ${value} is already in use. `,
    type: TYPES.ERROR,
  }),
  DELETE_OK: (key, value) => ({
    message: `The turtle with ${key} ${value} is removed. `,
    type: TYPES.INFO,
  }),
  NOT_DELETE: (key, value) => ({
    message: `No turtle with ${key} ${value} found. Nothing was removed. `,
    type: TYPES.ERROR,
  }),
  UPDATE_OK: (key, value) => ({
    message: `The turtle with ${key} ${value} has been updated. `,
    type: TYPES.INFO,
  }),
  NOT_UPDATED: () => ({
    message: "DATA WAS NOT UPDATED.",
    type: TYPES.INFO,
  }),
  KEYS_DO_NOT_MATCH: (keyValue, keyValueInResource) => ({
    message: `The number ${keyValueInResource} of given turtle is not the same as the given number ${keyValue}. `,
    type: TYPES.ERROR,
  }),
};

module.exports = { MESSAGES };
