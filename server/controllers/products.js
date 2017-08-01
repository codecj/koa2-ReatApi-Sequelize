const products = require('../dao/product');
// const user = require('../models/user');
const APIError = require('../rest').APIError;

module.exports = {
    'GET /api/products/allProd': async (ctx, next) => {//获取所有商品接口
        console.log(ctx)
        ctx.rest(await products.getProducts(ctx.query.name,ctx.query.price));
    },
    'GET /api/products/:id': async (ctx, next) => {//具体id的产品接口
         ctx.rest(products.getProduct(ctx.params.id));
    },
    'PUT /api/products/:id': async (ctx, next) => {//编辑的接口
        // console.log(parseFloat(ctx.request.body.price))
        var p = products.editProduct(ctx.params.id,ctx.request.body.name, parseFloat(ctx.request.body.price));
        ctx.rest(p);
    },
    'POST /api/addproducts': async (ctx, next) => {//添加商品提交的接口
        console.log(ctx.request.body);
        var p = products.createProduct(ctx.request.body.name, parseFloat(ctx.request.body.price));
        ctx.rest(p);
    },

    'DELETE /api/products/:id': async (ctx, next) => {//删除商品接口
        // console.log(`delete product ${ctx.params.id}...`);
        var p = products.deleteProduct(ctx.params.id);
        if (p) {
            ctx.rest(p);
        } else {
            throw new APIError('product:not_found', 'product not found by id.');
        }
    }
    // ,
    // 'POST /api/register': async (ctx, next) => {//注册接口
    //     // console.log(ctx.request.body)

    //     var p = products.register(ctx.request.body.username, parseFloat(ctx.request.body.password));
    //     ctx.rest(p);
    // },
    // 'POST /api/login': async (ctx, next) => {//登录接口
    //     // console.log(ctx.request.body)
    //     // ctx.render('register.html', {
    //     //     title: '登录失败'
    //     // });
    //     var p = products.login(ctx.request.body.username, parseFloat(ctx.request.body.password));
    //     ctx.rest(await p);
    //     // ctx.render('register.html', {
    //     //     title: '登录失败'
    //     // });
    // },

};



