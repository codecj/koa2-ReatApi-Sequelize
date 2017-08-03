const Koa = require("koa");
const koacors = require("koa2-cors");//允许跨域
const bodyParser = require("koa-bodyparser");//用来解析body的中间件
const controller = require("./controller");
const rest = require("./rest");
const app = new Koa();
const status = require('./status');
//添加格式化处理响应结果的中间件，在添加路由之前调用
app.use(status);
// app.use(async (ctx, next) => {
//     await next();
// });
app.use(koacors());

app.use(bodyParser());

// bind .rest() for ctx:
app.use(rest.restify());

// add controllers:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');