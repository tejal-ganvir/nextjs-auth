const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('Database connected')) /*Mongodb Connected*/

app.use(express.json()) /*Body Praser Activated*/
app.use(cors()) /*Allows CORS Request*/
app.use('/app', routesUrls) /*Routes Connected*/
app.listen(4000, () => console.log('server is up and running')); /*Server Start*/