import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { dbConnection } from "./config/dbConnection.js";
import routes from "./config/authRoutes.js";
import 'dotenv/config';
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'https://food-web-front.vercel.app', // Allow only this domain
    credentials: true,
  };
  
  app.use(cors(corsOptions));
  
app.use(cors({ origin: corsOptions, credentials: true }));

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

dbConnection();

// For Sign Up and Login Routes :

app.use("/", routes);

app.get("/", async (req, res) => {
    res.send("Hello this is backend")
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
