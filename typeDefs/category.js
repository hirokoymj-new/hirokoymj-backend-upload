const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    categories(limit: Int, cursor: String, filter: [String]): CategoryFeed!
    categoryById(id: ID!): Category!
    categoryAll: [Category!]
  }

  extend type Mutation {
    createCategory(input: createCategoryInput): Category
    updateCategory(id: ID!, input: updateCategoryInput!): Category
    deleteCategory(id: ID!): Category
  }

  type Category {
    id: ID!
    name: String!
    abbr: String!
    order: Int
    createdAt: Date!
    updatedAt: Date!
  }

  input updateCategoryInput {
    name: String
    abbr: String
    order: Int
  }

  input createCategoryInput {
    name: String!
    abbr: String!
    order: Int
  }

  type CategoryFeed {
    categoryFeed: [Category!]
    totalCount: Int!
    pageInfo: PageInfo!
  }
`;
