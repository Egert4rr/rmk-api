const bcrypt = require("bcrypt")

async function hashPassword(plaintextPassword) {
    return await bcrypt.hash(plaintextPassword, 10)
}
 
// compare password
async function verifyPassword(plaintextPassword, hash) {    
    return await bcrypt.compare(plaintextPassword, hash)
}
module.exports = {hashPassword,verifyPassword}