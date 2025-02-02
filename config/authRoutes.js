import express from "express";
import { isAuthenticated, login, logout, signup } from "../authController/authController.js";
import { userAuth } from "../authController/userAuth.js";
import { getUserData } from "../authController/userController.js";
import { categoryNames, getAllOrders, myOrders, sendList, itemDetails } from "../foodItem/foodAccess.js";

const routes = express.Router();

routes.post("/login", login);
routes.post("/signup", signup);
routes.post("/logout", logout);
routes.get("/data", userAuth, getUserData)
routes.get("/is-auth", userAuth, isAuthenticated)
routes.get("/categoryName", categoryNames)
routes.post("/takeEmail", getAllOrders)
routes.post("/myorders", myOrders)
routes.post("/sendList", sendList)
routes.get("/itemDetails", itemDetails)

export default routes;