import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { Product } from "./Product";
import { Ref } from '../types';

@ObjectType({ description: 'The Cart model'})
export class Cart {

  @Field(_type => ID)
  id: String

  @Field(_type => String)
  @Property({ ref: Product, required: true})
  product: Ref<Product>
  _doc: any;
};

export const CartModel = getModelForClass(Cart);
