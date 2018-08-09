//Starting point of the Application
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//DB Setup
mongoose.connect('mongodb://localhost:27017/auth',  { useNewUrlParser: true });

//App setup
//Middleware
app.use(morgan("combined"));
app.use(cors())
app.use(bodyParser.json({type:'*/*'}));;
router(app)
//Server Setup
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port, () => console.log(`Listening to the port: ${port}`))