import { Router } from "express";
import { getSparkline1Data } from "../controllers/sparklineController1";

const router = Router();

router
    .get('/', getSparkline1Data);


export default router;