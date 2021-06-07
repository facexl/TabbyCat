const Router = require('@koa/router')
const home = require('../controllers/home')

const router = Router({
    prefix: '/home'
});

router.get('/index', home.index);

module.exports = router