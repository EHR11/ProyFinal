import cartModel from "../models/cart.model.js";


export default class cartController{
static async getCart(cid) {
    let cart= await cartModel.findOne({_id:cid}).populate("productsInCart._id")
    return cart
}

static async createCart(products){
    let result = await cartModel.create(products)
    return result
}

static async updateCart(cid,newProduct,newQuantity){
    try{
    if (!cid||!newProduct){
        throw new Error(`Missing parameter(s): ${!cid?"cid, ":""}${!newProduct?"product, ":""}${!quantity?"quantity":""}`)
    }
    let cart = this.getCart(cid)
    let prodPlace=cart.productsInCart.findIndex((prod)=>prod.pid===newProduct)
    if (prodPlace<0){
        cart.productsInCart.push({product:newProduct, quantity:newQuantity})
    }
    else{
        cart.productsInCart[prodPlace].quantity+=newQuantity
    }
    let result = await cartModel.updateOne({_id:cid},{productsInCart:cart.productsInCart})
    return result
    }
    catch(error){
        return "Error: "+error.message
    }      
}

static deleteCart(cid){
    let result = cartModel.deleteOne({_id:cid})
    return result    
}
}