const crypto=require("crypto")

const userId = crypto.randomBytes(4).toString('hex');

console.log(userId);