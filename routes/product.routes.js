import { Router } from "express";
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { validateProduct, validateQueryParam, validateQueryParamIdRequired } from "../validators/productValidator.js";
const productRouter = Router();


productRouter.route('').get([validateQueryParam], getProducts);

productRouter.route('').post([validateProduct], createProduct);

productRouter.route('').put([validateQueryParamIdRequired, validateProduct], updateProduct);

productRouter.route('').delete([validateQueryParamIdRequired], deleteProduct);


export default productRouter;