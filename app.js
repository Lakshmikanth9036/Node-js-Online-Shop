const path = require("path");

const mongoose = require("mongoose");

const csrf = require('csurf');
const flash = require('connect-flash');

const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://lakshmikanth:MongoDB0910@cluster0.puarb.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const csrfProtection = csrf();

// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false })); // to parse input data
app.use(express.static(path.join(__dirname, "public"))); // for css style
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
