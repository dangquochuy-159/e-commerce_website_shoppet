const path = require("path");
const express = require('express')
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const morgan = require('morgan')
const handlebars = require("express-handlebars")
const route = require("./routes");
const db = require("./config/db");
const session = require('express-session');
const methodOverride = require("method-override");
// const requireLogin = require('./app/middlewares/requireLogin');
// const passport = require('./app/middlewares/passport');
// const sortMiddleware = require("./app/middlewares/checkLoginMiddlewares");
const app = express()
const port = 3000
db.connect();


// Use express-session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
// app.use(requireLogin)

// Use Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan('combined'))
app.use(express.static('public'))
// cung cấp đường dẫn đến thư mục
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
    express.urlencoded({
        extended: true,
    })
);
//custom middleware
// app.use(sortMiddleware)

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        helpers: require('./helpers/handlebars')
    })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})