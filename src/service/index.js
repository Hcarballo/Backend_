import {UsersDao, ProductsDao, CartsDao } from '../daos/factory.js';
import CartRepository from '../repositories/cart.repository.js';
import ProductRepository from '../repositories/product.repository.js';
import UserRepository from '../repositories/user.repository.js';

export const userService = new UserRepository(new UsersDao());
export const productService = new ProductRepository(new ProductsDao());
export const cartService = new CartRepository(new CartsDao());




