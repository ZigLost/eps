// Ref: Route Structure pratice (https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers)
const routes = require('express').Router();
const properties = require('./properties');
const provinces = require('./provinces');
const proptypes = require('./proptypes');
const prices = require('./prices');

// middleware to use for all requests
routes.use((req, res, next) => {
    console.log(`${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')} | Received request from ${req.ip} method ${req.method} ${req.originalUrl}`);
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8280/api)
routes.get('/', (req, res) => {
    return res.json({ message: 'hooray! welcom to EPS Api' });
});

routes.use('/properties', properties);
routes.use('/provinces', provinces);
routes.use('/proptypes', proptypes);
routes.use('/prices', prices);

module.exports = routes;