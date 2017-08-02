const products = require('../dao/productDao');
const APIError = require('../rest').APIError;

module.exports = {
    'GET /api/products/allProd': async (ctx, next) => {//获取所有商品接口
        ctx.rest(await products.getProducts(ctx.query.name,ctx.query.price));
    },
    'GET /api/products/:id': async (ctx, next) => {//具体id的产品接口
         ctx.rest(products.getProduct(ctx.params.id));
    },
    'PUT /api/products/:id': async (ctx, next) => {//编辑的接口
        var p = products.editProduct(ctx.params.id,ctx.request.body.name, parseFloat(ctx.request.body.price));
        ctx.rest(await p);
    },
    'POST /api/addproducts': async (ctx, next) => {//添加商品提交的接口
        var p = products.createProduct(ctx.request.body.name, parseFloat(ctx.request.body.price));
        ctx.rest(await p);
    },

    'DELETE /api/products/:id': async (ctx, next) => {//删除商品接口
        var p = products.deleteProduct(ctx.params.id);
        if (p) {
            ctx.rest(await p);
        } else {
            throw new APIError('product:not_found', 'product not found by id.');
        }
    }
};



