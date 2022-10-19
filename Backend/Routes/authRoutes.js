const auth = require("../Controllers/authController")

module.exports = (app) => {
    app.route("/login").post(auth.loginUser)    
    app.route("/register").post(auth.registerUser)
}