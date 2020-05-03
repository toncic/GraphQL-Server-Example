import { Product, ProductModel } from '../entities/Product'
import { Resolver, Query, Arg, Mutation, Root, FieldResolver } from 'type-graphql';
import { ProductInput } from './types/ProductInput';
import { Categories } from '../entities/Categories';
import { CategoriesModel } from '../entities/Categories';

@Resolver(_of => Product)
export class ProductResolver {

  @Query(_returns => [Product])
  async getAllProducts() {
    return await ProductModel.find();
  }

  @Query(_returns => Product, { nullable: false })
  async getSingleProduct(@Arg('id') id: string) {
    return await ProductModel.findById({ _id: id });
  }

  @Mutation(_returns => Product)
  async createProduct(@Arg('inputData') {
    name,
    description,
    color,
    stock,
    price,
    category_id
  } : ProductInput) : Promise<Product> {
    const product = (await ProductModel.create({
      name,
      description,
      color,
      stock,
      price,
      category_id
    })).save();
    return product;
  }

  @Mutation(_returns => Boolean)
  async deleteProduct(@Arg('id') id: string) : Promise<Boolean> {
    await ProductModel.deleteOne({ _id: id });
    return true;
  }

  @FieldResolver(_returns => Categories)
  async category(@Root() product: Product): Promise<Categories> {
    return (await CategoriesModel.findById(product._doc.category_id))!;
  }

}
