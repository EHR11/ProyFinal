import mongoose from 'mongoose'

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    productsInCart: { type: [{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "products"
        },
        quantity:Number
    }]
    },
})

const cartModel = mongoose.model(cartCollection, cartSchema, cartCollection)

export default cartModel;