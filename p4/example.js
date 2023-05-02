"use strict";

/*
 * Load the model data for Project 4, Problem 1. We load into DOM the
 * property models.exampleModel a function that returns an object with the
 * following property:
 *    name:  A string with name.
 *
 * See README.md for information on how to access it.
 */
var models;

if (models === undefined) {
  models = {};
}

models.exampleModel = function () {
  return {
    name: "Kevin",
    motto: "One step at a time."
  };
};
