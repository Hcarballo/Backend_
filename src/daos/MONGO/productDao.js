import { productModel } from '../../models/products.models.js';

export default class ProductsDao {

    constructor() {
        this.productModel = productModel;
    };

    async addProducts(product) {
        return await this.productModel.create(product);
    };

    getProducts = async () => {
        return await this.productModel.find().lean();
    };

    getProductsById = async (id) => {
        return await this.productModel.findByIdAndUpdate(id);
    };

    updateProduct = async (updatedProduct) => {
        const result = await this.productModel.updateOne(updatedProduct);
    };

    deleteProduct = async (id) => {
        return await this.productModel.findByIdAndDelete(id);
    };
}