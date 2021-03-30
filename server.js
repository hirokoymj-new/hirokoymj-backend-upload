const express = require("express");
const cors = require("cors");
const { ApolloServer, makeExecutableSchema } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");
const dotEnv = require("dotenv");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const { connection } = require("./database/util");
const WeatherAPI = require("./datasources/weather");

// set env variables
dotEnv.config({
  path: process.env.NODE_ENV === "local" ? ".env.local" : ".env",
});

console.log("ENV:", process.env.NODE_ENV);
console.log("HOST:", process.env.HOST);
console.log("MONGO_DB_URL:", process.env.MONGO_DB_URL);

connection();

const app = express();
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })); // Maximum file size is up to 10MB
app.use(express.static("public"));
app.use(cors());

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({
  schema,
  uploads: false,
  dataSources: () => ({
    weatherAPI: new WeatherAPI(),
  }),
  introspection: true,
  playground: true,
});
apolloServer.applyMiddleware({ app });

const port = process.env.PORT || 4000;

app.listen({ port }, () => {
  console.log(
    `🚀Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  );
});
