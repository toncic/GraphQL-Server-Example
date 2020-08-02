var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Product, ProductModel } from '../entities/Product';
import { Resolver, Query, Arg, Mutation, Root, FieldResolver } from 'type-graphql';
import { ProductInput } from './types/ProductInput';
import { Categories } from '../entities/Categories';
import { CategoriesModel } from '../entities/Categories';
let ProductResolver = class ProductResolver {
    async getAllProducts() {
        return await ProductModel.find();
    }
    async getSingleProduct(id) {
        return await ProductModel.findById({ _id: id });
    }
    async createProduct({ name, description, color, stock, price, category_id }) {
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
    async deleteProduct(id) {
        await ProductModel.deleteOne({ _id: id });
        return true;
    }
    async category(product) {
        return (await CategoriesModel.findById(product._doc.category_id));
    }
};
__decorate([
    Query(_returns => [Product]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getAllProducts", null);
__decorate([
    Query(_returns => Product, { nullable: false }),
    __param(0, Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getSingleProduct", null);
__decorate([
    Mutation(_returns => Product),
    __param(0, Arg('inputData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    Mutation(_returns => Boolean),
    __param(0, Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "deleteProduct", null);
__decorate([
    FieldResolver(_returns => Categories),
    __param(0, Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Product]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "category", null);
ProductResolver = __decorate([
    Resolver(_of => Product)
], ProductResolver);
export { ProductResolver };
//# sourceMappingURL=ProductResolver.js.map