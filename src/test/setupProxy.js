const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api', {  //도메인 api로 호출
      // target: 'https://thisissumin.store/', //통신할 서버의 도메인주소
      target: 'localhost:5001/', //통신할 서버의 도메인주소
      changeOrigin: true,
    })
  )
}