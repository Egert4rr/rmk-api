require("dotenv").config()
const express = require('express')
const crypto = require('crypto')
const helmet = require('helmet')
const { config } = require("process")

const app = express()

app.use(function(req, res, next) {
    res.locals.nonce = crypto.randomBytes(16).toString("hex");
    next();
  });


app.use(helmet.contentSecurityPolicy({
    directives: {
       scriptSrc: [
            "'self'",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js",
            "https://unpkg.com/vue@3/dist/vue.esm-browser.js",
            "'sha256-s1vVw8TksVGpNwieRf5qwR0mx22jlDKFBK8U2XuzbFo='", 
            (req,res)=>`'nonce-${res.locals.nonce}'`,
            `${process.env.development?"'unsafe-eval'":"production"}`
        ],
        defaultSrc:[
            "http://localhost:3080"
        ]
    },
  }))
app.use(express.static('public'))
app.listen(process.env.PORT, () => console.log(`FRONT is listening on port ${process.env.PORT}!`))