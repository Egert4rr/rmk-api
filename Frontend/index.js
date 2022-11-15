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
            "https://kit.fontawesome.com/d419df19c6.js",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js",
            "https://unpkg.com/vue@3/dist/vue.esm-browser.js",
            "'sha256-s1vVw8TksVGpNwieRf5qwR0mx22jlDKFBK8U2XuzbFo='",
            (req,res)=>`'nonce-${res.locals.nonce}'`,
            `${process.env.development?"'unsafe-eval'":"production"}`
        ],
        defaultSrc:[
            "http://localhost:3030" // Here
        ],
        imgSrc:[
          "https://loremflickr.com/640/480/abstract",
          "'self'",
          "data:"
        ],
        connectSrc:[
          "'self'",
          "http://localhost:3030", // Here
          "https://ka-f.fontawesome.com/releases/v6.2.0/css/free-v4-shims.min.css",
          "https://ka-f.fontawesome.com/releases/v6.2.0/css/free-v5-shims.min.css",
          "https://ka-f.fontawesome.com/releases/v6.2.0/css/free.min.css",
          "https://ka-f.fontawesome.com/releases/v6.2.0/css/free-v5-font-face.min.css",
          "https://ka-f.fontawesome.com/releases/v6.2.0/css/free-v4-font-face.min.css"
        ]
      
    },
  }))
app.use(express.static('public'))
app.listen(process.env.PORT, () => console.log(`FRONT is listening on port ${process.env.PORT}!`))