import { Resolver, Query, Arg, Mutation, FieldResolver, Root } from "type-graphql";
import { Cart, CartModel } from "../entities/Cart";
import { CartInput } from "./types/CartInput";
import { Product } from "../entities/Product";
import { ProductModel } from "../entities/Product";

@Resolver(_of => Cart)
export class CartResolver {

  @Query(_returns => [Cart])
  async getAllCarts() {
    return await CartModel.find();
  }

  @Query(_returns => Cart, { nullable: false})
  async getSingleCart(@Arg("id") id: string) {
    return await CartModel.findById({ _id: id})
  }

  @Mutation(_returns => Cart)
  async createCart(@Arg("data") product: CartInput) : Promise<Cart> {
    const cart = (await CartModel.create({
       product
     })).save();
    return cart;
  }

  @Mutation(_returns => Boolean)
  async deleteCart(@Arg('id') id: string) {
    return CartModel.deleteOne({ _id: id });
  }

  @FieldResolver(_returns => Product)
  async product(@Root() cart: Cart): Promise<Product> {
    return (await ProductModel.findById(cart._doc.product))!;
  }

}
