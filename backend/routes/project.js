const Router = require('@koa/router')
const projectController = require('../controllers/project')

const router = Router({
    prefix: '/project'
});

router.post('/c',projectController.C)
router.get('/r',projectController.R)

module.exports = router