import { connectDB, objectConfig } from "../config/index.js";

export let ProductsDao;
export let CartsDao;
export let UsersDao;

switch (objectConfig.persistence) {
    case "MEMORY":

        break;
    case "FS":
        const { default: ProductDaoFS } = await import('./FS/productsManagerFS.js');
        ProductsDao = ProductDaoFS;
        break;

    default:
        connectDB();
        const { default: ProductDaoMongo } = await import('./MONGO/productDao.js');
        const { default: CartDaoMongo } = await import('./MONGO/cartDao.js');
        const { default: UserDaoMongo } = await import('./MONGO/userDao.js')
        
        ProductsDao = ProductDaoMongo;
        CartsDao = CartDaoMongo;
        UsersDao= UserDaoMongo;

        break;
}