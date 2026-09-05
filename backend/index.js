import express, { urlencoded } from "express";
import dotenv from"dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import userRoute from './routes/user.routes.js'
import postRoute from "./routes/post.routes.js";
import messageRoute from "./routes/message.routes.js"
import { app,server } from "./socket/socket.js";


dotenv.config();


const PORT = process.env.PORT || 3000;


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
app.use(cors());


app.use("/api/v1/user", userRoute)
app.use("/api/v1/post", postRoute)
app.use("/api/v1/message", messageRoute)


server.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
    
})
