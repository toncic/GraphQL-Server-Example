import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { connect } from "mongoose";
import { CategoriesResolver } from './resolver/CategoriesResolver';
import { ProductResolver } from './resolver/ProductResolver';
import { CartResolver } from './resolver/CartResolver';

const main = async () => {
    const schema = await buildSchema({
        resolvers: [CategoriesResolver, ProductResolver, CartResolver],
        emitSchemaFile: true,
        validate: false
    })

    const mongose = await connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
    mongose.connection;

    const server = new ApolloServer({ schema });
    const app = Express();
    server.applyMiddleware({ app })
    app.listen({ port: 3333 }, () =>
        console.log(`🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`)
    )
};

main().catch((error) => {
    console.log(error, 'error')
})
