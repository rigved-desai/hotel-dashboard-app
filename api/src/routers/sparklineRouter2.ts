import { Router } from "express";
import { getSparkline2Data } from "../controllers/sparklineController2";

const router = Router();

router
    .get('/', getSparkline2Data);

export default router;