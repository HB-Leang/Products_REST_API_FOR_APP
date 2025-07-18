import express from 'express';
import cors from 'cors';
import productRouter from './routes/product.routes.js';


// const express = require('express')



const app = express()
const port = process.env.PORT;

app.use(cors());
app.use(express.json());


app.use('/api/products', productRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
