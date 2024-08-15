import cartController from '../controllers/cart.controller.js';
import productController from '../controllers/product.controller.js';

import { Router } from 'express';

const router = new Router();

router.get('/:cid', async(req,res)=>{
    let cid=req.params.cid
    let result={}
    result = await cartController.getCart(cid)
    return res.json({status:"success", payload:result})
});

router.post('/', async(req,res)=>{
    let products=req.body
    let result= await cartController.createCart(products)
    console.log(result);
    return res.json({status:"success", payload:result})
});

router.put('/:cid', async(req,res)=>{
    console.log(req.body);
    let cid=req.params.cid;
    let {product, quantity=1} = req.body
    let result={}
    if (productController.getSingleProduct(pid).length>0)
        result= await cartController.updateCart(cid, product, quantity)
    else
        return res.json({status:"error: product not found"})
    console.log(result);
    return res.json({status:"success", payload:result})
});

router.delete('/:cid', async(req,res)=>{
    let cid=req.params.cid
    let result = await userModel.deleteOne({_id:cid})
    return res.json({status:"success", payload:result})
});

export default router
