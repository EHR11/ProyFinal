import productController from '../controllers/product.controller.js';

import { Router } from 'express';

const router = new Router();

router.get('/', async(req,res)=>{
    let limit=parseInt(req.query.limit)||999;
    let page=parseInt(req.query.page)||1;
    let query=req.query.query? JSON.parse(req.query.query):null;
    let sort=req.query.sort? JSON.parse(req.query.sort):{price:1};
    let result = await productController.getProducts(limit, page, query, sort)
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

router.put('/:uid', async(req,res)=>{
    let uid=req.params.uid
    let userToReplace = req.body
    if (!userToReplace.name || !userToReplace.lastName || !userToReplace.email)
        res.send({status:"error",error:"Missing Parameter(s)"})
    let result = await userModel.updateOne({_id:uid}, userToReplace)
        res.send({status:"success",payload:result})
});

router.delete('/:uid', async(req,res)=>{
    let uid=req.params.uid
    let result = await userModel.deleteOne({_id:uid})
        res.send({status:"success",payload:result})
});

export default router
