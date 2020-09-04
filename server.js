// STILL NEED TO ADD HANDLEBARS OR WHATEVER TEMPLATE GENERATOR 

const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();

const sess = {
    secret: process.env.DB_SECRET,
    cookie: {maxAge: 900000}, // 15 minutes
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(require('./controllers'));

sequelize.sync({force: true}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});