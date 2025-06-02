const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use('/api/likes', createProxyMiddleware({
    target: process.env.LIKE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/likes': '' }
  }));
};
