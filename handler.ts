// import 'reflect-metadata';

// import lambdaPlayground from 'graphql-playground-middleware-lambda';
// import {
//   Context,
//   APIGatewayProxyEvent,
//   APIGatewayProxyResult,
//   Callback,
//   APIGatewayEvent
// } from 'aws-lambda';
// import { ApolloServer } from 'apollo-server-lambda';
// const  mongoose = require('mongoose');
// // import { getConnectionManager, Connection } from 'typeorm';
// import { Database } from './app/db/Database';
const { ApolloServer, gql } = require('apollo-server-lambda');
const { buildSchema } = require('type-graphql');
const { connect } = require("mongoose");
const { CategoriesResolver } = require('./app/resolver/CategoriesResolver');
const { ProductResolver } = require('./app/resolver/ProductResolver');
const { CartResolver } = require('./app/resolver/CartResolver');

// const server = createServer();
// exports.graphql = createServer().createHandler();
// const createHandler = async () => {
//   console.log('Starting schema generation.');
//   const schema = await getSchema()
//   const server = new ApolloServer({
//     schema,
//     context: async ({ context }: { event: APIGatewayEvent; context: Context }) => {
//       context.callbackWaitsForEmptyEventLoop = false;

//       console.log('Before connecting to db')
//       mongoose.connect(
//         "mongodb+srv://admin:<admin-graphql>@cluster0.bgzjp.mongodb.net/<dbname>?retryWrites=true&w=majority",
//         { useNewUrlParser: true })
//         .then(() => console.log("Connected"))
//         .catch(err => console.log("Error", err));
//       //@todo: connect with db.
//       // const db = new Database();
//       // let connection = db.getConnection();

//       return { auth: { isAuthenticated: false } };
//     },
//   })

//   return server.createHandler({ cors: { origin: process.env.CORS_ORIIGN } });
//   // return (a,b,c) => {};
// }

// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// const resolver = {
//   Query: {
//     hello: () => 'Hello world!'
//   },
// };


const schema = getSchema();
const mongose = connect(
  "mongodb+srv://admin:graphql-admin@cluster0.bgzjp.mongodb.net/graphql-db?retryWrites=true&w=majority",
  { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
).then(() => console.log("DB connected")).catch(err => console.log("DB connection errror", err));
const server = new ApolloServer({ schema })

exports.graphql = server.createHandler();


async function getSchema() {
  console.log('Inside getSchema()');

  try {
    return await buildSchema({
      resolvers: [
        CategoriesResolver,
        ProductResolver,
        CartResolver
      ],
    })
  } catch (e) {
    console.log('Error at getSchema(), lets see whats wrong,', e);
  } finally {
    console.log('Finish getSchema()');
  }
}

// export const graphql = (
//   event: APIGatewayProxyEvent,
//   context: Context,
//   callback: Callback<APIGatewayProxyResult>
// ) => {
//   createHandler()
//     .then(
//       handler => handler(event, context, callback)
//     );
// };

// export const playgroundHandler = lambdaPlayground({ endpoint: process.env.GRAPHQL_API_PATH });

