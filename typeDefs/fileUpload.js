const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Upload

  type File {
    url: String!
  }

  type Photo {
    fileName: String!
    location: String
  }

  extend type Query {
    uploads: [File]
    photos(location: String!): [Photo!]
  }

  extend type Mutation {
    singleUpload(file: Upload!, location: String!): File!
  }
`;
