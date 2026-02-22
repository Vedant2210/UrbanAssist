const { Queue } = require("bullmq");
const redis = require("../config/redis");

const bookingQueue = new Queue("bookingQueue", {
  connection: redis,
});

module.exports = bookingQueue;
