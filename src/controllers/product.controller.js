import productModel from "../models/product.model.js";


export default class productController{
static async getProducts(limit, page, query, sort) {
    console.log({limit,page,query,sort})
    let parsedQuery = {};
    if (query) {
        parsedQuery = {
            $or: [
                { category: query.category || undefined },
                { status: query.status? query.status.toLowerCase() === 'true' ? true : undefined : undefined}
            ]
        };
    }

    console.log(sort);

    const pquant = await productModel.countDocuments(parsedQuery);
    let pages= await Math.ceil(pquant/limit)
    let hasPrevPage = page>1
    let hasNextPage = page<pages
    let prevPage= hasPrevPage? page-1:null
    let nextPage= hasNextPage? page+1:null
    let queryStr= query?`&query${query.category},${query.status}`:""
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
        "prevLink": hasPrevPage? `/products/?limit=${limit}&page=${hasPrevPage ? prevPage : ""}&sort=${Object.keys(sort)[0]},${Object.values(sort)[0]}${queryStr}`:null,
        "nextLink": hasNextPage? `/products/?limit=${limit}&page=${hasNextPage ? nextPage : ""}&sort=${Object.keys(sort)[0]},${Object.values(sort)[0]}${queryStr}`:null
    }
    console.log(rspObj);
    return rspObj
}

static async getSingleProduct(pid) {
    let product= await productModel.findOne({_id:pid})
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