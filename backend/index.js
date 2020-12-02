import express from "express";
import cors from "cors";
import shopRoutes from "./routes/shopRoutes/shopRoutes.js";
import dotenv from "dotenv";
import * as errorsMiddleware from "./middlewares/errorMiddleWare.js";
import loginRoutes from "./routes/authRoutes/loginRoute.js";
import dbConnect from "./mongoose/dbConnection.js";
import ordersRoutes from "./routes/ordersRoutes/ordersRoute.js";

dotenv.config();

dbConnect();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/config/paypal',(req,res)=>{

  res.send(process.env.CLIENT_ID) ;

})
app.use(shopRoutes);

app.use("/api/users", loginRoutes);
app.use("/api/orders",ordersRoutes);
app.use(errorsMiddleware.pageNotFound);
app.use(errorsMiddleware.error);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  console.log("connected");
});
