/**
 * 在app.use(router)之前调用
 */
var response_formatter = async (ctx, next) => {
    //先去执行路由
    await next();
    // console.log(ctx.body)
    //如果有返回数据，将返回数据添加到data中
    if (ctx.body) {
        ctx.body = {
            code: 200,
            message: '成功',
            pargam:ctx.params,
            data: ctx.body
        }
        console.log(ctx.body)
    } else {
        ctx.body = {
            code: 0,
            message: '失败'
        }
    }
}

module.exports = response_formatter;
