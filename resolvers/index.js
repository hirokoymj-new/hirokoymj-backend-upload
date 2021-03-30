const { GraphQLDateTime } = require("graphql-iso-date");

const categoryResolver = require("./category");
const subCategoryResolver = require("./subCategory");
const topicResolver = require("./topic");
const weatherResolver = require("./weather");
const cityResolver = require("./city");
const fileUploadResolvers = require("./fileUpload");

const customDateScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [
  customDateScalarResolver,
  categoryResolver,
  subCategoryResolver,
  topicResolver,
  weatherResolver,
  cityResolver,
  fileUploadResolvers,
];
