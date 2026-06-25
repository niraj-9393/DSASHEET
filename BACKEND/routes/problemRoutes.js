import express from "express";
import { addToSheet } from "../controller/problemController.js";

const Router = express.Router();

Router.post("/addtosheet", addToSheet);

export default Router;



