# GraphQL Server using  TypeGraphQL and Apollo Server

This is one of the many ways to implement the GraphQL server which I found pretty interesting.

Instead of fighting with manually creating files for schema and resolvers, we can do that in a gently way using typescript [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) and [TypeGraphQL](https://typegraphql.com/)

Take a look on this example:


```
@ObjectType()
class Recipe {
  @Field()
  title: string;

  @Field(type => [Rate])
  ratings: Rate[];

  @Field({ nullable: true })
  averageRating?: number;
}
```

## Available Scripts

In the project directory, you can run:

### `npm run build-tst`

To compile application

### `npm run test`

To start the server.<br />
