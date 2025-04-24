import express, { urlencoded } from "express";
import dotenv from"dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import userRoute from './routes/user.routes.js'

const app = express();


dotenv.config();


const PORT = process.env.PORT || 3000;


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsOptions = {
    origin: '*',
    credentials: true
};
app.use(cors(corsOptions));


app.use("/api/v1/user", userRoute)


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
    
})
