import productModel from "../models/product.model.js";


export default class productController{
static async getProducts(limit, page, query=null, sort={price:1}) {
    
    let parsedQuery = {};
    if (query) {
        parsedQuery = {
            $or: [
                { category: query.category || undefined },
                { status: query.status? query.status.toLowerCase() === 'true' ? true : undefined : undefined}
            ]
        };
    }

    console.log(parsedQuery);

    const pquant = await productModel.countDocuments(parsedQuery);
    console.log(pquant);
    let pages= await Math.ceil(pquant/limit)
    console.log(pages);
    let hasPrevPage = page>1
    let hasNextPage = page<pages
    let prevPage= hasPrevPage? page-1:null
    let nextPage= hasNextPage? page+1:null
    let strSort = JSON.stringify(sort)
    let strQuery = JSON.stringify(query)
    let products= await productModel.find(parsedQuery).sort(sort).skip((page-1)*limit).limit(limit).lean()
    let rspObj={
        "status": products ? "success":"error",
        "payload": products||null,
        "totalPages": pages,
        "prevPage": prevPage,
        "nextPage": nextPage,
        "page": page,
        "hasPrevPage": hasPrevPage,
        "hasNextPage": hasNextPage,
        "prevLink": hasPrevPage? `/products?limit=${limit}&page=${hasPrevPage ? prevPage : ""}&sort=${strSort}&query=${strQuery}`:null,
        "nextLink": hasNextPage? `/products?limit=${limit}&page=${hasNextPage ? nextPage : ""}&sort=${strSort}&query=${strQuery}`:null
    }
    return rspObj
}

static async getSingleProduct(pid) {
    let product= await productModel.findOne({_id:pid})
    console.log(product);
    return product
}

static async addProduct(title,description,code,price,status,stock,category,thumbnails){
    try{
    if (!title || !description || !code || !price || status==undefined || !stock || !category){

        throw new Error(`Missing Parameter(s): ${!title? "title":""}, ${!description? "description":""}, ${!code? "code":""}, ${!price? "price":""}, ${!status? "status":""}, ${!stock? "stock":""}, ${!category? "category":""}`)
    }
    let result = await productModel.create({title, description, code, price, status, stock, category, thumbnails})
    return result
    }
    catch(error){
        return "Error: "+error.message
    }    
}

static updateProduct(pid,product){
    let {title, description, code, price, status, stock, category, thumbnails} = req.body
    if (!title || !description || !code || !price || !status || !stock || !category){
        throw new Error("Missing Parameter(s)")
    }
    let result = productModel.updateOne({_id:pid},{title, description, code, price, status, stock, category, thumbnails})
    return result    
}

static deleteProduct(pid){
    let result = productModel.deleteOne({_id:pid})
    return result    
}
}