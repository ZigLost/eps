const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8280;

app.use(express.static('public'));

app.use('/api/v1', require('./routes'));

app.listen(port, () => {
    console.log(`start EPS Api on port ${port}`);
});