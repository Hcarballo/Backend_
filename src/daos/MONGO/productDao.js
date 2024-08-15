import { productModel } from '../../models/products.models.js';

export default class ProductsDao {

    constructor() {
        this.productModel = productModel;
    };

    addProducts = async (product) => {
        return await this.productModel.create(product);
    };

    getProducts = async () => {
        return await this.productModel.find().lean();
    };

    getProductsById = async (id) => {
        return await this.productModel.findById(id);
    };

    getProductsBy = async (filter) => {
        return await this.productModel.findOne(filter);
    };

    updateProduct = async (updatedProduct) => {
        return await this.productModel.updateOne(updatedProduct);
    };

    deleteProduct = async (id) => {
        return await this.productModel.findByIdAndDelete(id);
    };
}