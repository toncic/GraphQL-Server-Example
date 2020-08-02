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
import { Resolver, Query, Arg, Mutation, FieldResolver, Root } from "type-graphql";
import { Cart, CartModel } from "../entities/Cart";
import { CartInput } from "./types/CartInput";
import { Product } from "../entities/Product";
import { ProductModel } from "../entities/Product";
let CartResolver = class CartResolver {
    async getAllCarts() {
        return await CartModel.find();
    }
    async getSingleCart(id) {
        return await CartModel.findById({ _id: id });
    }
    async createCart(product) {
        const cart = (await CartModel.create({
            product
        })).save();
        return cart;
    }
    async deleteCart(id) {
        return CartModel.deleteOne({ _id: id });
    }
    async product(cart) {
        return (await ProductModel.findById(cart._doc.product));
    }
};
__decorate([
    Query(_returns => [Cart]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "getAllCarts", null);
__decorate([
    Query(_returns => Cart, { nullable: false }),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "getSingleCart", null);
__decorate([
    Mutation(_returns => Cart),
    __param(0, Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CartInput]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "createCart", null);
__decorate([
    Mutation(_returns => Boolean),
    __param(0, Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "deleteCart", null);
__decorate([
    FieldResolver(_returns => Product),
    __param(0, Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Cart]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "product", null);
CartResolver = __decorate([
    Resolver(_of => Cart)
], CartResolver);
export { CartResolver };
//# sourceMappingURL=CartResolver.js.map