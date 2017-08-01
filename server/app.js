const Koa = require("koa");
const koacors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const controller = require("./controller");
const templating = require("./templating");
const rest = require("./rest");
const app = new Koa();


app.use(koacors());
app.use(async (ctx, next) => {
    // console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

app.use(bodyParser());
app.use(templating('view', {
    noCache: true,
    watch: true
}));
// bind .rest() for ctx:
app.use(rest.restify());

// add controllers:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');