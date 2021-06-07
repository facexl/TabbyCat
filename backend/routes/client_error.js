const Router = require('@koa/router')
const clientErrorController = require('../controllers/client_error')

const router = Router({
    prefix: '/client/err'
});

router.get('/c',clientErrorController.C)
router.get('/r',clientErrorController.R)

module.exports = router