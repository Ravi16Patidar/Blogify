import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import userRoute from "./routes/userRoutes.js";
import blogRoute from "./routes/blogRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);  
console.log(__filename,__dirname,'filenameanddirname')

// Middleware to serve static files
app.use('/uploads', express.static(join(__dirname, 'uploads')));
const PORT = process.env.PORT || 4000;
// app.use(cors());
app.use(cors({
origin:["https://blogify-frontend-nine.vercel.app"],
methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
credentials:true
}))
mongoose
  .connect(`mongodb+srv://ravi4116patidar:ravi600882@cluster0.mjbm1ae.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.get('/',(req,res)=>{
  res.send('Hello')
})
app.use(userRoute);
app.use(blogRoute);

app.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  } else {
    console.log(`Server is running at http://localhost:${PORT}`);
  }
});
