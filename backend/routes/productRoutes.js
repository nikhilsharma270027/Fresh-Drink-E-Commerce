import express from 'express';
import { getAllCan, getAllCookie, getAllProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/can', getAllCan);
router.get('/cookie', getAllCookie);
router.get('/:id', getProductById);


export default router;
