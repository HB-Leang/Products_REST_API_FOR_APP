import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { validateProduct, validateParam } from "../validators/productValidator.js";
const productRouter = Router();


productRouter.route('/').get(getProducts);

productRouter.route('/:id').get([validateParam], getProduct);

productRouter.route('/').post([validateProduct], createProduct);

productRouter.route('/:id').put([validateParam, validateProduct], updateProduct);

productRouter.route('/:id').delete([validateParam], deleteProduct);


export default productRouter;