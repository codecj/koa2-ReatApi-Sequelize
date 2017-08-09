/**
 * 在app.use(router)之前调用
 */
const reason = require('./common/codeReason');
var response_formatter = async (ctx, next) => {
    //先去执行路由
    await next();
    // //如果有返回数据，将返回数据添加到data中
    if (ctx.body != "") {
        ctx.body = {
            data: ctx.body,
            para: ctx.query,
            code: ctx.code,
            msg: reason.getReason(ctx.code)
        }
    } else {
        ctx.body = {
            code: ctx.code,
            msg: reason.getReason(ctx.code)
        }
    }
}

module.exports = response_formatter;
