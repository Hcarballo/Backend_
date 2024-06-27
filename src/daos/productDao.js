import { productModel } from '../models/products.models.js';

export default class ProductDao {

    constructor() { };

    async addProducts(product) {
        return await productModel.create(product);
    };

    // async getProducts({ limit = 3, numpage = 1 }) {
    async getProducts() {
        return await productModel.find();
        // return await productModel.paginate({}, { limit, page: numpage, lean: true });
    };

    getProductsById = async (id) => {
        return await productModel.findByIdAndUpdate(id);
    };

    updateProduct = async (updatedProduct) => {
        const result = await productModel.updateOne(updatedProduct);
    };

    deleteProduct = async (id) => {
        return await productModel.findByIdAndDelete(id);
    };
}