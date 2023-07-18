require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override')
const app = express();
const { engine } = require('express-handlebars');
const morgan = require('morgan');

const port = process.env.PORT || 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));
  
// HTTP Logger
app.use(morgan('combined'));

app.use(methodOverride('_method'))
//  Template engine
app.engine('.hbs', engine({ extname: '.hbs',
            helpers : {
                multi: (a,b) => (a * b).toFixed(3),
                sum: (a,b) => a + b,
                total: (cart) => {
                    let total = 0;
                    cart.forEach((item) => {
                      total += item.quantity * item.price;
                    });
                    return total.toFixed(3);
                  },
            }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
