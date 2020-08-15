require('dotenv').config();

import 'reflect-metadata';

import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  APIGatewayEvent
} from 'aws-lambda';
const { ApolloServer } = require('apollo-server-lambda');
const { buildSchema } = require('type-graphql');
const { connect } = require("mongoose");
const { CategoriesResolver } = require('./app/resolver/CategoriesResolver');
const { ProductResolver } = require('./app/resolver/ProductResolver');

async function createHandler () {
  console.log('Starting schema generation.');
  const schema = getSchema();
  const server = new ApolloServer({
    schema,
    context: async ({ context }: {event: APIGatewayEvent; context: Context}) => {
      context.callbackWaitsForEmptyEventLoop = false;

      connect(
        process.env.MONGO_DB_CONNECTION_STRING,
        { 
          useUnifiedTopology: true,
          useNewUrlParser: true,
        },
      )
      .then(() => console.log("DB connected"))
      .catch(err => console.log("DB connection errror", err));

      return { auth: { isAuthenticated: false }}
    },
  })
  return server.createHandler();
}

async function getSchema() {
  console.log('Inside getSchema()');

  try {
    return await buildSchema({
      resolvers: [
        CategoriesResolver,
        ProductResolver,
      ],
    })
  } catch (e) {
    console.log('Error at getSchema(), lets see whats wrong,', e);
  } finally {
    console.log('Finish getSchema()');
  }
}


export const graphql = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>
) => {
  createHandler()
    .then(
      handler => handler(event, context, callback)
    );
};

