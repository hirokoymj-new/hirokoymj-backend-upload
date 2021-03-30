# GraphQL Apollo Server for hirokoymj.com

### Production URL

https://hirokoymj-backend.herokuapp.com/

### Localhost URL

http://localhost:4000/

### MongoDB Local

mongodb://localhost:27017/mydb

### MonboDB Production

[MongoDB Altras Login](https://account.mongodb.com/account/login?nds=true)

### Deploying Apollo Server to Heroku in production

- [Deploying with Heroku](https://www.apollographql.com/docs/apollo-server/deployment/heroku/)

### Enabling GraphQL Playground in production

- `introspection` and the `playground` can be enabled explicitly in the following manner.
- [Apollo Server Official Doc: GraphQL Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/#gatsby-focus-wrapper)

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // enabled!!
  playground: true, // enabled!!
});
```

<hr />

**Daily log**
12/6

This is the fullstack app for the [Apollo tutorial](http://apollographql.com/docs/tutorial/introduction.html). 🚀

03/29/2021

```js
npm install apollo-server-express express graphql-upload
```
