const fs = require('fs')
const path = require('path')
const Router = require('@koa/router')

// const basename = path.basename(module.filename);
const outFiles = [path.basename(module.filename),'whitelist.js']
const router = Router({
    prefix:'/v1'
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (!outFiles.includes(file)) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    let route = require(path.join(__dirname, file));
    router.use(route.routes(), route.allowedMethods());
  });


module.exports = router;
