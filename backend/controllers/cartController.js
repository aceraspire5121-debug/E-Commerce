import { User } from "../models/userModel.js"
import { Product } from "../models/productModel.js"
import { Cart } from "../models/CartModel.js"
export const addToCart = async (req, res) => {
    try {
        const id = req.user.id // token banate time hamne id:UserExist._id kia tha isliye yaha par seedha id likh skte hai bina _id likhe,
        console.log(id)
        const productId = req.params.id // kyoki route me "/:id" likhne par ab ye params object ke andar available hai isliye req.params.id
        console.log(productId)
        const quantity = req.body?.quantity || 1;
        console.log(quantity)
        const product = await Product.findById(productId)
        if (!product)
            return res.status(404).json({ success: false, message: "Product not found" })
        let cart = await Cart.findOne({ user: id })
        if (!cart) {
            cart = await Cart.create({ user: id, items: [{ product: productId, quantity: quantity }] })
            return res.status(201).json({
                success: true,
                message: "Cart created & product added",
                cart,
            });
        }
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity }) // cart.items is an array and we are using array method push so we dont need [{...}] here
        }
        await cart.save();
        res.status(200).json({ success: true, message: "Product added to cart", cart })
    } catch (err) {
        res.status(500).json({ message: "Server mar raha hai Error" })
    }
}

export const getProductsFromCart=async (req,res)=>{
    try {
        const id=req.user.id;
        const cart=await Cart.findOne({user:id}).populate("items.product") // populate actual data la deta hai, jaise hamara items.product ek productId deta hai par populate us productId ka data lakar de dega
           if(!cart)
            return res.status(404).json({success:false,message:"Cart of this user does not exist"}) // 404 :- resource not found
        res.status(200).json({success:true,cart})

    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}