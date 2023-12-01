import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import dbConnection from './models/index.js';
import mainRoute from './routes/inedx.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(mainRoute);

app.get('/', (req,res) => {
    res.json({'message' : "default"});
})

dbConnection.sequelize.sync({alter: true})
    .then(() => {
        console.log('database connected');
        app.listen(process.env.PORT , () => {
            console.log('server listening on port ', process.env.PORT);
        })
    }).catch((error) => {
        console.log('throw error connectng database : ', error)
    })