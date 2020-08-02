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
import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { Categories, CategoriesModel } from '../entities/Categories';
import { CategoriesInput } from './types/CategoriesInput';
let CategoriesResolver = class CategoriesResolver {
    async getSingleCategory(id) {
        return await CategoriesModel.findById({ _id: id });
    }
    async getAllCategories() {
        return await CategoriesModel.find();
    }
    async createCategory({ name, description }) {
        const category = (await CategoriesModel.create({
            name,
            description
        })).save();
        return category;
    }
    async deleteCategory(id) {
        await CategoriesModel.deleteOne({ _id: id });
        return true;
    }
};
__decorate([
    Query(_returns => Categories, { nullable: false }),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "getSingleCategory", null);
__decorate([
    Query(() => [Categories]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "getAllCategories", null);
__decorate([
    Mutation(() => Categories),
    __param(0, Arg("inputData")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoriesInput]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "createCategory", null);
__decorate([
    Mutation(() => Boolean),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "deleteCategory", null);
CategoriesResolver = __decorate([
    Resolver()
], CategoriesResolver);
export { CategoriesResolver };
//# sourceMappingURL=CategoriesResolver.js.map