import express from 'express';
import  { connectDB }  from './src/db.js';
import bodyParser from 'body-parser';
import userRouter from './src/routes/crud.route.js'; 
import cors from 'cors'

const app = express();
app.use(cors());
const port = 3000;
//body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connection wijth db
connectDB();

app.use('/api/user',userRouter);

app.listen(port, ()=>{
    console.log(`App listen on ${port}`);
})