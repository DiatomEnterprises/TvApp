const express = require("express")
const expressStaticGzip = require("express-static-gzip")
const app = express()

app.use("/", expressStaticGzip("dist"))

app.listen(3000, () => console.log("Server started on http://localhost:3000"))
