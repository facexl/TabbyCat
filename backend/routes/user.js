const Router = require('@koa/router')
const adminUserController = require('../controllers/admin_user')

const router = Router({
    prefix: '/user'
});

router.post('/login', adminUserController.login);
router.get('/info',adminUserController.info)
router.post('/signIn',adminUserController.signIn)

module.exports = router