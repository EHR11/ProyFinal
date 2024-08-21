import express from "express"
import productController from '../controllers/product.controller.js'
import cartController from '../controllers/cart.controller.js'

const router = express.Router()

let cart=null

router.get("/",async (req,res)=>{
    if (!cart){
        cart=await cartController.createCart()
        console.log(cart);
    }
    let {limit=12,page=1,sort={"price":1},query=null}=req.query
    let queryObj=query?JSON.parse(query):null
    let sortObj=typeof sort==="string"?JSON.parse(sort):sort
    let payload = await productController.getProducts(limit, page, queryObj, sortObj)
    let categories=[]
    payload.payload.forEach(product=>{
        if (!categories.includes(product.category))
            categories.push(product.category)
    })
    res.render("index",{
        title:"BlitzShop",
        products: payload.payload,
        page: payload.page,
        prevPage: payload.prevPage,
        nextPage: payload.nextPage,
        prevLink: payload.prevLink,
        nextLink: payload.nextLink,
        cart: cart._id,
        categories: categories
    })
})
router.get("/product/:pid",async (req,res)=>{
    if (!cart){
        cart=await cartController.createCart()
        console.log(cart);
    }
    let pid=req.params.pid
    console.log(pid);
    let {_id, title, description, code, price, status, stock, category, thumbnails}= await productController.getSingleProduct(pid)
    res.render("productPage",{_id, title, description, code, price, status, stock, category, thumbnails,cart: cart._id})
})

router.get("/cart/:cid",async (req,res)=>{
    let cid=req.params.cid
    let cartToShow= await cartController.getCart(cid)
/*     let productList=[]
    cartToShow.productsInCart.forEach(product=>{
        let newProduct=product._id
        newProduct.quantity=product.quantity
        productList.push(newProduct)
    })
    console.log(productList); */
    res.render("cartPage",{
        cartToShow
    })
})

export default router