const express = require('express')
const bodyParser = require('body-parser')
const graphQlHttp = require('express-graphql')
const graphQlSchema = require('./graphql/schema/index')
const graphQlResolver = require('./graphql/resolvers/index')
const mongoose = require('mongoose')
const isAuth = require('./middleware/is-auth')
const connectDB = require('./db')
connectDB();
const app = express();

app.use(bodyParser.json());
app.use(isAuth);
app.use('/graphql',graphQlHttp({
    schema:graphQlSchema,
    rootValue:graphQlResolver,
    graphiql: true

}))

const server = app.listen(3000);

// handle unhandle rejection

process.on('unhandledRejection',(err, promise) => {
    console.log(`Unhandled rejection: ${err.message}`.red.bold);
    //close server and exit process
    server.close(() => process.exit(1));
})