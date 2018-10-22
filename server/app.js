const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose  = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();

//allow cors
app.use(cors());

mongoose.connect('mongodb://volos:1qaz!QAZ@ds137863.mlab.com:37863/volos-test-base');

mongoose.connection.once('open', () => {
    console.log('Connected to DB');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, (err) => {
    console.log('Listening on port 4000');
});
