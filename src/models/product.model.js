import mongoose from 'mongoose'

const productCollection = "products"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max:30 },
    description: { type: String, required: true, max: 500 },
    code: { type: String, required: true},
    price: { type: Number, required:true},
    status: { type:Boolean, required: true},
    stock: { type: Number, required: true},
    category: {type: String, required: true},
    thumbnails: {type:[{
        type:String
    }],
    default:[]}
})

const productModel = mongoose.model(productCollection, productSchema, productCollection)

export default productModel;