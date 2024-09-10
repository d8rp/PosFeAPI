import express from "express";
import {MakeNewOrder} from "../controllers/Orders";

const router = express.Router();

router.route("/orders").post(MakeNewOrder)

export default router;