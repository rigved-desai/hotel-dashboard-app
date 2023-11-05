import { Router } from "express";
import { getColumnChartData } from "../controllers/columnChartController";

const router = Router();

router
    .get('/', getColumnChartData)

export default router;