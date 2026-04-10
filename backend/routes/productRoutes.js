import express from "express"
import { addProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from "../controllers/productController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { isadmin } from "../middleware/isadmin.js";
import upload from "../middleware/multer.js";
import { addToCart, getProductsFromCart } from "../controllers/cartController.js";
const router=express.Router()
router.post("/addProducts",verifyToken,isadmin,upload.array("images",4),addProduct)
router.get("/getProducts",getProducts)
router.get("/products",verifyToken,getProductsFromCart) // static routes upar rakho barna bo /products ko neeche bale get me "/:id" smjkar id=products kar dega jo ki problem karega bahut
router.get("/:id",getSingleProduct)
router.put("/:id",verifyToken,isadmin,upload.array("images",4),updateProduct)
router.delete("/:id",verifyToken,isadmin,deleteProduct) // jo "/:id" ye likha hai iski bajha se hi tum ab req.params.id karke nikal skte ho id
router.post("/:id",verifyToken,addToCart)

export default router;