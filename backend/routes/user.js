const Router = require('@koa/router')
const adminUserController = require('../controllers/admin_user')

const router = Router({
    prefix: '/user'
});

router.post('/login', adminUserController.login);
router.get('/info',adminUserController.info)
router.post('/signIn',adminUserController.signIn)
router.get('/list',adminUserController.list)
router.post('/setStatus',adminUserController.setStatus)
router.post('/update',adminUserController.update)
router.post('/changePassword',adminUserController.changePassword)

module.exports = router