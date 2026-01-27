const Redis = require('ioredis');

const cacheInstance = new Redis({
    host:'redis-19283.crce263.ap-south-1-1.ec2.cloud.redislabs.com',
    port: 19283,
    password: 'jb2HdyCDS82Sg99dwc8h43WR3dCWK9KO'
})

module.exports = cacheInstance;