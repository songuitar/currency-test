const Koa = require("koa");
const Router = require('koa-router');
const bodyParser = require('koa-body-parser');
const {MongoClient} = require('mongodb');
const vars = require('./environment')

const app = new Koa();
const router = new Router();

const client = new MongoClient(vars.dbAccessString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


client.connect(err => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log('Successfully connected to mongodb')
})

router.use(bodyParser())

router.post('/donate',
    async (ctx, next) => {

  console.log(ctx.body)
  console.log(ctx.request.body)
  console.log(ctx.req.body)

/*
  client.db(vars.dbName)
      .collection('donations')
      .insertOne({})
*/

  return await next()
});

app.use(router.routes());
app.use(bodyParser({ enableTypes: ['json', 'text'] }));

app.use(async ctx => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', '*');
  ctx.body = ctx.request.body;
});

app.listen(vars.serverPort);
console.log(`server is running at localhost:${vars.serverPort}`)
