const path = require("path");
const express = require('express')
const morgan = require('morgan')
const handlebars = require("express-handlebars")
const route = require("./routes");
// const methodOverride = require("method-override");
const app = express()
const port = 3000

app.use(morgan('combined'))
app.use(express.static('public'))
// cung cấp đường dẫn đến thư mục
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
// app.use(methodOverride("_method"));
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
    })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})