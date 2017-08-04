/**
 * 在app.use(router)之前调用
 */
// const res = require('./common/apiResponse');
const reason = require('./common/codeReason');

// const succ = require('./sORf/ifSuccess');


var response_formatter = async (ctx, next) => {
    //先去执行路由
    await next();
    // console.log(JSON.stringify(ctx.body))
    // console.log(ctx)
    // ctx.body = res.genHttpResp(succ.processFail(),ctx.body);
    // ctx.body.para = ctx.query;
    // console.log(res.genHttpResp(4,ctx.body));
    // console.log(ctx.body)
    // console.log("-------------")
    
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
    // console.log(ctx.body)


}

module.exports = response_formatter;
