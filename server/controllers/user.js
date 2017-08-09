const user = require('../dao/userDao');
module.exports = {
    'POST /api/register': async (ctx, next) => {//注册接口
        var p = user.register(ctx.request.body.username, ctx.request.body.password);
        ctx.rest(await p);
    },
    'POST /api/login': async (ctx, next) => {//登录接口
        var p = user.login(ctx.request.body.username, ctx.request.body.password);
        ctx.rest(await p);
        
        ctx.code = ctx.body.code;
        ctx.body = ctx.body.user;
    }
}