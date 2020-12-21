# GraphQL Server using  TypeGraphQL and Apollo Server in AWS Lambda

This is one of the many ways to implement the GraphQL server which I found pretty interesting.

Instead of fighting with manually creating files for schema and resolvers, we can do that in a nice way using typescript [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) and [TypeGraphQL](https://typegraphql.com/)

Here is an example of Recipe class:


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

