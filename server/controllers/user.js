const user = require('../dao/userDao');
module.exports = {
    'POST /api/register': async (ctx, next) => {//注册接口
        // console.log(ctx.request.body)

        var p = user.register(ctx.request.body.username, parseFloat(ctx.request.body.password));
        ctx.rest(p);
    },
    'POST /api/login': async (ctx, next) => {//登录接口
        var p = user.login(ctx.request.body.username, parseFloat(ctx.request.body.password));
        ctx.rest(await p);
        
        ctx.render('register.html', {
            title: '登录失败'
        });
    }
}