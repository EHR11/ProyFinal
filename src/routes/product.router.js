import productController from '../controllers/product.controller.js';

import { Router } from 'express';

const router = new Router();

router.get('/', async(req,res)=>{
    const limit=parseInt(req.query.limit)||999;
    const page=parseInt(req.query.page)||1;
    const query=req.query.query?req.query.query.split(","):null
    const queryObj=query?{
        category:query[0],
        status:query[1]
    }:null
    const sort=req.query.sort.split(",")
    const sortObj={}
    sortObj[sort[0]]=parseInt(sort[1])
    console.log(limit, page, queryObj, sortObj);
    let result = await productController.getProducts(limit, page, queryObj, sortObj)
    return res.json(result)
});

router.get('/:pid', async(req,res)=>{
    let pid=req.params.pid
    let result = await productController.getSingleProduct(pid)
    return res.json(result)
});

router.post('/', async(req,res)=>{
    console.log(req.body);
    let {title,description,code,price,status,stock,category,thumbnails} = req.body
    let result= await productController.addProduct(title,description,code,price,status,stock,category,thumbnails)
    console.log(result);
    return res.json(result)
});

router.put('/:pid', async(req,res)=>{
    console.log(req.body);
    let {title,description,code,price,status,stock,category,thumbnails} = req.body
    let result= await productController.updateProduct(title,description,code,price,status,stock,category,thumbnails)
    console.log(result);
    return res.json(result)
});

router.delete('/:pid', async(req,res)=>{
    let pid=req.params.pid
    let result = await productController.deleteProduct(pid)
        res.send({status:"success",payload:result})
});

export default router
