import express from "express"
import productController from '../controllers/product.controller.js'
import cartController from '../controllers/cart.controller.js'

const router = express.Router()

router.get("/",async (req,res)=>{
    let payload = await productController.getProducts(12, 1)
    res.render("index",{
        title:"BlitzShop",
        products: payload.payload,
        page: payload.page,
        prevPage: payload.prevPage,
        nextPage: payload.nextPage,
        prevLink: payload.prevLink,
        nextLink: payload.prevLink
    })
})
router.get("/product/:pid",(req,res)=>{
    let pid=req.params.pid
    let product=productController.getSingleProduct(pid)
    res.render("productPage",{
        payload:product
    })
})

router.get("/cart/:cid",(req,res)=>{
    let cid=req.params.cid
    let cart= cartController.getCart(cid)
    res.render("cartPage",{
        payload:cart
    })
})

export default router