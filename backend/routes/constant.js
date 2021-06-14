const Router = require('@koa/router')
const constantController = require('../controllers/constant')

const router = Router({
    prefix: '/config'
});
router.get('/roles',constantController.roles)

module.exports = router