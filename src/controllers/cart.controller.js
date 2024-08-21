import cartModel from "../models/cart.model.js";


export default class cartController{
static async getCart(cid) {
    let cart= await cartModel.findOne({_id:cid}).populate("productsInCart._id").lean()
    return cart
}

static async createCart(products){
    let result = await cartModel.create(products)
    return result
}

static async updateCart(cid,newProduct,newQuantity){
    try{
    if (!cid||!newProduct){
        throw new Error(`Missing parameter(s): ${!cid?"cid, ":""}${!newProduct?"product, ":""}${!newQuantity?"quantity":""}`)
    }
    let cart = await this.getCart(cid)
    console.log(cart.productsInCart);
    let prodPlace=cart.productsInCart.findIndex((prod)=>prod._id._id==newProduct)
    console.log(prodPlace);
    if (prodPlace<0){
        cart.productsInCart.push({_id:newProduct, quantity:parseInt(newQuantity)})
    }
    else{
        cart.productsInCart[prodPlace].quantity=parseInt(cart.productsInCart[prodPlace].quantity)+parseInt(newQuantity)
    }
        await cartModel.updateOne({_id:cid},{productsInCart:cart.productsInCart})
        let result=await cartModel.findOne({_id:cid})
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