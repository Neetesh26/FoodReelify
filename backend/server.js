// start server
require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
const cacheInstance = require('./src/services/cachingRedis.service');

connectDB();
const port = process.env.PORT || 3000
cacheInstance.on("connect", () => {
    console.log("Connected to Redis cache");
});
cacheInstance.on("error", (err) => {
    console.error("Redis connection error:", err);
});
cacheInstance.on("ready", () => {
    console.log("Redis cache is ready to use");
});

// disconnect cache on app termination
cacheInstance.on("end", () => {
    console.log("Redis connection closed");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})