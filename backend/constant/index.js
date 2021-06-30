const roles = require('./roles')
const status = require('./status')

module.exports = {
    roles,
    ...status
}