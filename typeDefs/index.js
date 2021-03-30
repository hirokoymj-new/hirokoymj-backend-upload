const { gql } = require("apollo-server-express");

const categoryTypeDefs = require("./category");
const subCategoryTypeDefs = require("./subCategory");
const topicTypeDefs = require("./topic");
const weatherTypeDefs = require("./weather");
const cityTypeDefs = require("./city");
const fileUploadTypeDefs = require("./fileUpload");

const typeDefs = gql`
  scalar Date
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
  }
`;

module.exports = [
  typeDefs,
  categoryTypeDefs,
  subCategoryTypeDefs,
  topicTypeDefs,
  weatherTypeDefs,
  cityTypeDefs,
  fileUploadTypeDefs,
];
