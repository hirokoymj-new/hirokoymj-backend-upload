const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    topics(limit: Int, cursor: String, filter: [String]): TopicFeed!
    topicById(id: ID!): Topic!
    topicByCategory(categoryId: ID!): [Topic!]
    topicByCategoryAbbr(abbr: String!): [Topic!]
  }

  extend type Mutation {
    createTopic(input: createTopicInput): Topic
    deleteTopic(id: ID!): Topic
    updateTopic(id: ID!, input: updateTopicInput!): Topic
  }

  input createTopicInput {
    title: String!
    url: String!
    category: ID!
    subCategory: ID!
  }

  input updateTopicInput {
    title: String
    url: String
    category: ID!
    subCategory: ID!
  }

  type Topic {
    id: ID!
    title: String!
    url: String!
    category: Category
    subCategory: SubCategory
  }

  type TopicFeed {
    topicFeed: [Topic!]
    totalCount: Int!
    pageInfo: PageInfo!
  }
`;
