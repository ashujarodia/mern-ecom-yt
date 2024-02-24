import express from 'express';
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getLatestProducts, getSingleProduct, newProduct, updateProduct } from '../controllers/product.js';
import { singleUpload } from '../middlewares/multer.js';
import { adminOnly } from '../middlewares/auth.js';

const app = express.Router();

//Create new product  -/api/v1/product/new
app.post('/new', adminOnly, singleUpload, newProduct);

//Get latest 5 products  -/api/v1/product/latest
app.get('/latest', getLatestProducts);

//Get all unique categories  -/api/v1/product/categories
app.get('/categories', getAllCategories);

//Get all products with filters  -/api/v1/product/all
app.get('/all', getAllProducts);

//Get all products  -/api/v1/product/admin-products
app.get('/admin-products', adminOnly, getAdminProducts);

//To get , update and delete products
app.route('/:id').get(getSingleProduct).put(adminOnly, singleUpload, updateProduct).delete(adminOnly, deleteProduct);

export default app;
