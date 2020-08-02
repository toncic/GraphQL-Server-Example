import 'reflect-metadata';
import lambdaPlayground from 'graphql-playground-middleware-lambda';
import { ApolloServer } from 'apollo-server-lambda';
const { buildSchema } = require('type-graphql');
const { CategoriesResolver } = require('./app/resolver/CategoriesResolver');
const { ProductResolver } = require('./app/resolver/ProductResolver');
const { CartResolver } = require('./app/resolver/CartResolver');
async function getSchema() {
    console.log('Inside getSchema()');
    try {
        return await buildSchema({
            resolvers: [
                CategoriesResolver,
                ProductResolver,
                CartResolver
            ],
        });
    }
    catch (e) {
        console.log('Error at getSchema()');
    }
    finally {
        console.log('Finish getSchema()');
    }
}
const createHandler = async () => {
    console.log('Starting schema generation.');
    const schema = await getSchema();
    const server = new ApolloServer({
        schema,
        context: async ({ context }) => {
            context.callbackWaitsForEmptyEventLoop = false;
            return { auth: { isAuthenticated: false } };
        },
    });
    return server.createHandler({ cors: { origin: process.env.CORS_ORIGIN } });
};
export const graphql = (event, context, callback) => {
    createHandler().then(handler => handler(event, context, callback));
};
export const playgroundHandler = lambdaPlayground({ endpoint: process.env.GRAPHQL_API_PATH });
//# sourceMappingURL=handler.js.map