import { InputType, Field } from "type-graphql";
import { ObjectId } from 'mongodb';

@InputType()
export class CartInput {

  @Field(_type => String)
  product: ObjectId
}
