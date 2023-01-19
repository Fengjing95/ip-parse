/*
 * @Date: 2023-01-18 16:53:14
 * @Author: 枫
 * @LastEditors: 枫
 * @description: description
 * @LastEditTime: 2023-01-19 12:19:38
 */
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import Koa from 'koa'
import Router from '@koa/router'
import views from 'koa-views'
import { isIP, parseIP } from './utils/ip.js'
import { errorFormat, responseFormat } from './utils/response.js'

const app = new Koa()
const router = new Router()

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

router.get('/', async (ctx) => {
  const { ip } = ctx.request.query
  if (!ip) {
    // 没有 ip 渲染空页面
    await ctx.render('index', {ip: ''})
    return
  }

  if (!isIP(ip)) {
    // 不合法 IP 报错
    await ctx.render('index', { ip, msg: 'IP格式错误' })
  } else {
    // 检索省市区
    const res = parseIP(ip)
    
    // 返回带数据的页面
    await ctx.render('index', {ip, res})
  }
})

router.get('/json', async (ctx) => {
  const { ip } = ctx.request.query
  if (!ip) {
    ctx.status = 400
    ctx.body = errorFormat(40001, 'IP 不能为空')
    return
  }

  if (!isIP(ip)) {
    ctx.status = 400
    ctx.body = errorFormat(40002, 'IP 格式错误')
  } else {
    const res = parseIP(ip)
    ctx.body = responseFormat(res)
  }
})

app.use(router.routes())

app.listen(4000, () => {
  console.log('IP 查询服务启动: 4000');
})
