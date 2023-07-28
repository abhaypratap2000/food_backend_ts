import express from "express";
import bodyParser from "body-parser";
import { AdminRoute , VenderRoute } from "./routes";
import { MONGO_URI } from "./config";
import mongoose from "mongoose";


const app = express();

const port = 3001;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));
  
  app.use('/admin' , AdminRoute);
  app.use('/vendor', VenderRoute);

mongoose.connect(MONGO_URI)
    .then((res) => {
      console.log('dbconnected');
    })
    .catch((err) => {
      console.log(err);
    });


  app.listen(port, () => {
    console.clear();
    console.log(`Connection sucessfull on ${port}`);
  });
  