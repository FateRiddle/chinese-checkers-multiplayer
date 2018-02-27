import path from 'path'
import KoaStatic from 'koa-static'
import KoaHelmet from 'koa-helmet'
import KoaWebpack from 'koa-webpack'
import WebpackConfig from '../webpack.dev.js'
import Server from 'boardgame.io/server'
import checkers from '../src/game'

const PORT = process.env.PORT || 8000
const DEV = process.env.NODE_ENV === 'development'
const PROD = !DEV

const app = Server({ games: [checkers] })

if (DEV) {
  app.use(
    KoaWebpack({
      config: WebpackConfig,
    })
  )
}

if (PROD) {
  app.use(KoaStatic(path.join(__dirname, 'dist')))
  app.use(KoaHelmet())
}

app.listen(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`)
})
