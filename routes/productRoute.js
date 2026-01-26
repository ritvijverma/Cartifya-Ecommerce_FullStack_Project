import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { createProductController, deleteProductController, getProductController, getProductPhotoController, getSingleProductController, updateProductController } from "../controllers/productController.js"
import formidable from 'express-formidable'

const router = express.Router()
//create product
router.post('/create-product', requireSignIn,isAdmin, formidable() ,createProductController)

//get product 
router.get('/get-product', requireSignIn, isAdmin, getProductController )

//get single product 
router.get('/getsingle-product/:slug', requireSignIn, isAdmin, getSingleProductController )

//get photo 
// product photos are public so the browser <img> tag can load them without auth headers
router.get('/product-photo/:pid', getProductPhotoController)

//delete route 
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController)

//update product 
router.put('/update-product/:pid', requireSignIn,isAdmin, formidable() ,updateProductController)


export default router