const md5 = require('md5');
const { md5ProjectTokenSalt } = require('./config/config')

console.log(
    md5(`${md5ProjectTokenSalt}1`),
    md5(`${md5ProjectTokenSalt}2`),
)